"use client";


import ButtonVar1 from "@/app/components/button/button_var_1";
import ButtonVar2 from "@/app/components/button/button_var_2";
import ButtonVar3 from "@/app/components/button/button_var_3";
import CardVar1 from "@/app/components/card/card_var_1";
import { faHouse, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faBuildingUser } from "@fortawesome/free-solid-svg-icons";
import BreadcrumbsButtonVar1 from "@/app/components/breadcrumbs/breadcrumbs_button_var_1";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TableVar4 from "@/app/components/table/table_var_4";
import { UnitService } from "@/backend/services/unitService";
import { use } from "react";
import { useEffect } from "react";
import ModalVar1 from "@/app/components/modal/modal_var_1";
import InputVar1 from "@/app/components/input/input_var_1";
import AlertVar1 from "@/app/components/alert/alert_var_1";


export default function TagihanAirPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [idTagihanAir, setIdTagihanAir] = useState<string>("");
    const isEmpty = (val: any) => !val;
    const isNotNumber = (val: any) => isNaN(Number(val));
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [dataNamaKontrakan, setDataNamaKontrakan] = useState<any>(null);
    const [FormTagihanAir, setFormTagihanAir] = useState(
        {
            tanggal_bayar: "",
            pemakaian: "",
            total_tagihan: "",
            status: "",
            foto: null as File | null,
            bukti_pembayaran: null as File | null,
        }
    ) || useState<any[]>([]);
    const [dataTagihanAir, setDataTagihanAir] = useState<any[]>([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [totalMeteran, setTotalMeteran] = useState<number>(0);
    const [totalTagihanAir, setTotalTagihanAir] = useState<number>(0);
    const [errors, setErrors] = useState<any>({});


    const validationForm = () => {
        const error: any = {};
        if (isEmpty(FormTagihanAir.tanggal_bayar)) {
            error.tanggal_bayar = "Tanggal wajib";
        }
        if (isEmpty(FormTagihanAir.pemakaian)) {
            error.pemakaian = "Pemakaian wajib diisi";
        }

        if (FormTagihanAir.bukti_pembayaran === null) {
            error.bukti_pembayaran = "Wajib upload";
        } else {
            const file = FormTagihanAir.bukti_pembayaran;

            if (file.size > 2 * 1024 * 1024) {
                error.bukti_pembayaran = "Max 2MB";
            }

            if (!["image/jpeg", "image/png"].includes(file.type)) {
                error.bukti_pembayaran = "Harus JPG/PNG";
            }
        }

        if (FormTagihanAir.foto === null) {
            error.foto = "Wajib upload";
        } else {
            const file = FormTagihanAir.foto;

            if (file.size > 2 * 1024 * 1024) {
                error.foto = "Max 2MB";
            }

            if (!["image/jpeg", "image/png"].includes(file.type)) {
                error.foto = "Harus JPG/PNG";
            }
        }

        return error;
    }

    const tambahTagihanAir = async () => {
        try {
            const payload = {
                ...FormTagihanAir,
                total_tagihan: hitungTotalTagihan(),
                id_kontrakan: id,
            }
            console.log(payload);
            const errorsVal = validationForm();
            if (Object.keys(errorsVal).length > 0) {
                setErrors(errorsVal);
                return;
            }
            setErrors({});

            const formData = new FormData();
            formData.append("id_kontrakan", id);
            formData.append("tanggal_bayar", FormTagihanAir.tanggal_bayar);
            formData.append("pemakaian", FormTagihanAir.pemakaian);
            formData.append("total_tagihan", hitungTotalTagihan());
            formData.append("foto", FormTagihanAir.foto as File);
            formData.append("bukti_pembayaran", FormTagihanAir.bukti_pembayaran as File);
            console.log(formData);
            await UnitService.tambahTagihanAir(formData);
            await getTagihanAirByIdKontrakan();
            await hitungTotalMeteran();
            await hitungTotalTagihanAir();
            setIsModalAddOpen(false);
            await getNamaKontrakan();
        } catch (error: any) {
            alert("Gagal menambahkan data: " + error.message);
        }
    }

    const hitungTotalTagihan = () => {
        const hitung = (Number(FormTagihanAir.pemakaian) * 25000).toString();
        return hitung;
    }

    const hitungTotalMeteran = async () => {
        const data = await UnitService.hitungTotalMeteran(id);
        setTotalMeteran(data ?? 0);
    }

    const hitungTotalTagihanAir = async () => {
        const data = await UnitService.hitungTotalTagihan(id);
        setTotalTagihanAir(data ?? 0);
    }


    const getNamaKontrakan = async () => {
        const data = await UnitService.getUnitById(id);
        setDataNamaKontrakan(data[0].users.nama_user);
    }

    const getTagihanAirByIdKontrakan = async () => {
        const data = await UnitService.getAllTagihanByIdKontrakan(id);
        setDataTagihanAir(data ?? []);
    }
    const hapusDataTagihanAir = async () => {
        try {
            if (!idTagihanAir) return;
            await UnitService.deleteTagihanAir(idTagihanAir);
            await getTagihanAirByIdKontrakan();
            await hitungTotalMeteran();
            await hitungTotalTagihanAir();
            setAlertOpen(false);
        } catch (error: any) {
            alert("Gagal menghapus data: " + error.message);
        }
    }

    useEffect(() => {
        hitungTotalTagihanAir();
        hitungTotalMeteran();
        getTagihanAirByIdKontrakan();
        getNamaKontrakan();
    }, []);


    return (
        <div className="relative justify-center mb-5">
            <div className="absolute top-0 left-0 z-0 bg-[#111A45] pt-24 h-74 w-full"></div>

            <div className="relative mt-24 z-10 mx-auto lg:px-16 px-10">
                <div className="grid grid-cols-1 mb-5">
                    <BreadcrumbsButtonVar1
                        items={[
                            { title: "Halaman Utama", onClick: () => { router.push("/page/admin_page/halaman_utama") } },
                            { title: "Kontrakan", onClick: () => { router.push("/page/admin_page/kontrakan") } },
                            { title: "Tagihan Air", onClick: () => { } },
                        ]}
                    />
                </div>
                <div className="grid grid-cols-2">
                    <div>
                        <p className="text-white text-3xl font-bold">Pembayaran Kontrakan</p>
                        <p className="text-gray-500 text-sm">Halaman ini menampilkan data pembayaran kontrakan.</p>
                    </div>
                    <div className="justify-self-end">
                        <div className="flex gap-2">
                            <ButtonVar2 />
                            <ButtonVar1 onClick={() => { setIsModalAddOpen(true) }} />
                            {isModalAddOpen && (
                                <ModalVar1
                                    title="Tambah Pembayaran"
                                    description="Silahkan isi data kontrakan di bawah ini."
                                    onClose={() => setIsModalAddOpen(false)}
                                    onSave={() => { tambahTagihanAir() }}
                                >
                                    <>
                                        <InputVar1
                                            label="Tanggal Bayar"
                                            type="date"
                                            placeholder="Masukkan tanggal bayar"
                                            name="tanggal_bayar"
                                            value={FormTagihanAir.tanggal_bayar}
                                            onChange={(e) => setFormTagihanAir((prev) => ({ ...prev, tanggal_bayar: e.target.value }))}
                                            error={errors.tanggal_bayar}
                                        />
                                        <InputVar1
                                            label="Pemakaian"
                                            type="text"
                                            placeholder="Masukkan pemakaian"
                                            name="pemakaian"
                                            value={FormTagihanAir.pemakaian}
                                            onChange={(e) => setFormTagihanAir((prev) => ({ ...prev, pemakaian: e.target.value }))}
                                            error={errors.pemakaian}
                                        />
                                        <InputVar1
                                            label="Total Tagihan"
                                            type="text"
                                            placeholder="Masukkan total tagihan"
                                            name="total_tagihan"
                                            value={hitungTotalTagihan()}
                                            readOnly={true}
                                        />
                                        <InputVar1
                                            label="Foto"
                                            type="file"
                                            placeholder="Masukkan foto"
                                            name="foto"
                                            onChange={(e) => setFormTagihanAir((prev) => ({ ...prev, foto: e.target.files?.[0] || null }))}
                                            error={errors.foto}
                                        />
                                        <InputVar1
                                            label="Bukti Pembayaran"
                                            type="file"
                                            placeholder="Masukkan bukti pembayaran"
                                            name="bukti_pembayaran"
                                            onChange={(e) => setFormTagihanAir((prev) => ({ ...prev, bukti_pembayaran: e.target.files?.[0] || null }))}
                                            error={errors.bukti_pembayaran}
                                        />
                                    </>
                                </ModalVar1>
                            )}
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-5">
                    <CardVar1
                        title="Total Meteran"
                        count={totalMeteran}
                        subtitle={""}
                        icon={faHouse}
                        bigIcon={faBuildingUser}
                        iconColor="blue"
                    />
                    <CardVar1
                        title="Total Tagihan"
                        count={totalTagihanAir.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR"
                        })}
                        subtitle={""}
                        icon={faHouse}
                        bigIcon={faBuildingUser}
                        iconColor="red"
                    />
                    <CardVar1
                        title="Penyewa"
                        count={dataNamaKontrakan || "-"}
                        subtitle="Berkeluarga"
                        icon={faHouse}
                        bigIcon={faBuildingUser}
                        iconColor="blue"
                    />
                </div>
                <div className="grid grid-cols-1">
                    <TableVar4
                        title="Tagihan Air"
                        deskripsi="Halaman ini menampilkan data tagihan air."
                        head={["Tanggal Bayar", "Pemakaian", "Total Tagihan", "Status"]}
                        isiData={["tanggal_bayar", "pemakaian", "total_pembayaran"]}
                        data={dataTagihanAir}
                        renderAksi={(item: any) => (
                            <div className="flex gap-2">
                                <ButtonVar3 iconButton={faEye} color="blue" onClick={() => { }} />
                                <ButtonVar3 iconButton={faEye} color="yellow" onClick={() => { }} />
                                <ButtonVar3 iconButton={faTrash} color="red" onClick={() => { setAlertOpen(true); setIdTagihanAir(item.id) }} />
                            </div>
                        )}
                    />
                    {alertOpen && (
                        <AlertVar1
                            title="Hapus Data"
                            description="Apakah Anda yakin ingin menghapus data ini?"
                            onClose={() => setAlertOpen(false)}
                            onSave={() => { hapusDataTagihanAir(); setAlertOpen(false) }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
