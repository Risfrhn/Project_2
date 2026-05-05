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
import ModalVar1 from "@/app/components/modal/modal_var_1";
import InputVar1 from "@/app/components/input/input_var_1";
import { UnitService } from "@/backend/services/unitService";
import { use } from "react";
import { useEffect } from "react";
import AlertVar1 from "@/app/components/alert/alert_var_1";

export default function PembayaranPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [dataNamaKontrakan, setDataNamaKontrakan] = useState<any>(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const isEmpty = (val: any) => !val;
    const isNotNumber = (val: any) => isNaN(Number(val));
    const [dataPembayaran, setDataPembayaran] = useState<any[]>([]);
    const [idSelected, setIdSelected] = useState<string>("");
    const [dataPembayaranTerbaru, setDataPembayaranTerbaru] = useState<any>(null);
    const [uangMasuk, setUangMasuk] = useState<number>(0);
    const [date, setDate] = useState<string>("");
    const [form, setForm] = useState({
        tanggal_bayar: "",
        bulan: "",
        jumlah_bayar: "",
        bukti_pembayaran: null as File | null,
    });



    const validateForm = () => {
        const errors: any = {};

        if (isEmpty(form.tanggal_bayar)) {
            errors.tanggal_bayar = "Tanggal wajib";
        }

        if (isEmpty(form.bulan)) {
            errors.bulan = "Bulan wajib";
        }
        if (Number(form.bulan) < 1 || Number(form.bulan) > 12) {
            errors.bulan = "Bulan tidak valid";
        }

        if (isEmpty(form.jumlah_bayar)) {
            errors.jumlah_bayar = "Wajib diisi";
        }
        if (isNotNumber(form.jumlah_bayar)) {
            errors.jumlah_bayar = "Harus angka";
        }
        if (Number(form.jumlah_bayar) < 0) {
            errors.jumlah_bayar = "Tidak boleh negatif";
        }
        if (Number(form.jumlah_bayar) > 10000000) {
            errors.jumlah_bayar = "Max 10 juta";
        }

        if (!form.bukti_pembayaran) {
            errors.bukti_pembayaran = "Wajib upload";
        } else {
            const file = form.bukti_pembayaran;

            if (file.size > 2 * 1024 * 1024) {
                errors.bukti_pembayaran = "Max 2MB";
            }

            if (!["image/jpeg", "image/png"].includes(file.type)) {
                errors.bukti_pembayaran = "Harus JPG/PNG";
            }
        }

        return errors;
    }

    const TambahDataBayar = async () => {
        try {
            const payload = {
                ...form,
                id_kontrakan: id,
            };

            const errorsVal = validateForm();
            if (Object.keys(errorsVal).length > 0) {
                setErrors(errorsVal);
                return;
            }
            setErrors({});

            const formData = new FormData();
            formData.append("id_kontrakan", id);
            formData.append("tanggal_bayar", payload.tanggal_bayar);
            formData.append("bulan", payload.bulan);
            formData.append("jumlah_bayar", payload.jumlah_bayar);
            if (payload.bukti_pembayaran) {
                formData.append("bukti_pembayaran", payload.bukti_pembayaran);
            }

            await UnitService.tambahPembayaran(formData);
            setIsModalAddOpen(false);
            // Refresh data state
            await getAllPembayaran();
            await hitungBulan();
            await getPembayaranTerbaru();
            await hitungTotalUangMasuk();
        } catch (error: any) {
            alert("Gagal menyimpan: " + error.message);
        }
    }

    const getAllPembayaran = async () => {
        const data = await UnitService.getPembayaranByIdKontrakan(id);
        setDataPembayaran(data || []);
    }

    const hitungBulan = async () => {
        const data = await UnitService.hitungBulan(id);
        setDate(data || "Belum ada data");
    }
    const getPembayaranTerbaru = async () => {
        const data = await UnitService.getPembayaranTerbaru(id);
        setDataPembayaranTerbaru(data || null);
    }

    const hitungTotalUangMasuk = async () => {
        const data = await UnitService.hitungTotalBayarById(id);
        setUangMasuk(data || 0);
    }

    const hapusDataPembayaran = async () => {
        try {
            if (!idSelected) return;
            await UnitService.hapusDataPembayaran(idSelected);
            await getAllPembayaran();
            await hitungBulan();
            await getPembayaranTerbaru();
            await hitungTotalUangMasuk();
            setAlertOpen(false);
            setIdSelected("");
        } catch (error: any) {
            alert("Gagal menghapus: " + error.message);
        }
    }

    const getNamaKontrakan = async () => {
        const data = await UnitService.getUnitById(id);
        setDataNamaKontrakan(data[0].users.nama_user);
        console.log(data[0].users.nama_user);
    }

    useEffect(() => {
        getAllPembayaran();
        getNamaKontrakan();
        hitungBulan();
        getPembayaranTerbaru();
        hitungTotalUangMasuk();
    }, []);


    return (
        <div className="relative justify-center mb-5">
            <div className="absolute top-0 left-0 z-0 bg-[#111A45] pt-24 h-74 w-full"></div>

            {isModalAddOpen && (
                <ModalVar1
                    title="Tambah Pembayaran"
                    description="Silahkan isi data kontrakan di bawah ini."
                    onClose={() => setIsModalAddOpen(false)}
                    onSave={() => { TambahDataBayar() }}
                >
                    <>
                        <InputVar1
                            label="Tanggal Bayar"
                            type="date"
                            placeholder="Masukkan tanggal bayar"
                            name="tanggal_bayar"
                            value={form.tanggal_bayar}
                            onChange={(e) => setForm((prev) => ({ ...prev, tanggal_bayar: e.target.value }))}
                            error={errors.tanggal_bayar}
                        />
                        <InputVar1
                            label="Bulan"
                            type="text"
                            placeholder="Masukkan bulan"
                            name="bulan"
                            value={form.bulan}
                            onChange={(e) => setForm((prev) => ({ ...prev, bulan: e.target.value }))}
                            error={errors.bulan}
                        />
                        <InputVar1
                            label="Jumlah Bayar"
                            type="text"
                            placeholder="Masukkan jumlah bayar"
                            name="jumlah_bayar"
                            value={form.jumlah_bayar}
                            onChange={(e) => setForm((prev) => ({ ...prev, jumlah_bayar: e.target.value }))}
                            error={errors.jumlah_bayar}
                        />
                        <InputVar1
                            label="Bukti Pembayaran"
                            type="file"
                            placeholder="Masukkan bukti pembayaran"
                            name="bukti_pembayaran"
                            onChange={(e) => setForm((prev) => ({ ...prev, bukti_pembayaran: e.target.files?.[0] || null }))}
                            error={errors.bukti_pembayaran}
                        />
                    </>
                </ModalVar1>
            )}
            <div className="relative mt-24 z-10 mx-auto lg:px-16 px-10">
                <div className="grid grid-cols-1 mb-5">
                    <BreadcrumbsButtonVar1
                        items={[
                            { title: "Halaman Utama", onClick: () => { router.push("/page/admin_page/halaman_utama") } },
                            { title: "Kontrakan", onClick: () => { router.push("/page/admin_page/kontrakan") } },
                            { title: "Pembayaran Kontrakan", onClick: () => { } },
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
                            <ButtonVar1 onClick={() => { setIsModalAddOpen(true) }} text="Tambah Data" />
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-5">
                    <CardVar1
                        title="Waktu Tersisa"
                        count={dataPembayaranTerbaru?.bulan ? `${dataPembayaranTerbaru.bulan} Bulan` : "-"}
                        subtitle={date ? `Jatuh Tempo ${date}` : "Belum ada data"}
                        icon={faHouse}
                        bigIcon={faBuildingUser}
                        iconColor="blue"
                    />
                    <CardVar1
                        title="Uang Masuk"
                        count={uangMasuk > 0 ? `Rp ${uangMasuk.toLocaleString('id-ID')}` : "Rp 0"}
                        subtitle="Terbayar"
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
                        title="Pembayaran Kontrakan"
                        deskripsi="Halaman ini menampilkan data pembayaran kontrakan."
                        head={["Tanggal Bayar", "Bulan", "Jumlah Bayar", "Aksi"]}
                        isiData={["tanggal_bayar", "bulan", "jumlah_bayar"]}
                        data={dataPembayaran}
                        renderAksi={(item: any) => (
                            <div className="flex gap-2">
                                <ButtonVar3 iconButton={faEye} color="blue" onClick={() => { }} />
                                <ButtonVar3 iconButton={faTrash} color="red" onClick={() => { setAlertOpen(true); setIdSelected(item.id) }} />
                            </div>
                        )}
                    />
                </div>
                {alertOpen && (
                    <AlertVar1
                        title="Hapus Data Pembayaran"
                        description="Apakah anda yakin ingin menghapus data pembayaran ini?"
                        onClose={() => setAlertOpen(false)}
                        onSave={() => { hapusDataPembayaran() }}
                    />
                )}
            </div>
        </div>
    );
}
