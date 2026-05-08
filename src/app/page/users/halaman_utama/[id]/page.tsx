"use client";


import ButtonVar1 from "@/app/components/button/button_var_1";
import ButtonVar2 from "@/app/components/button/button_var_2";
import CardVar1 from "@/app/components/card/card_var_1";
import TableVar1 from "@/app/components/table/table_var_1";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBuildingUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { UnitService } from "@/backend/services/unitService";
import { use } from "react";
import { ActService } from "@/backend/services/actService";
import InputVar1 from "@/app/components/input/input_var_1";
import InputDropdownVar2 from "@/app/components/input/input_dropdown_var_2";
import ModalVar1 from "@/app/components/modal/modal_var_1";
import { PaymentService } from "@/backend/services/paymentService";


export default function DashboardUsersPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [date, setDate] = useState<string>("");
    const [dataPembayaranTerbaru, setDataPembayaranTerbaru] = useState<any>(null);
    const [unitData, setUnitData] = useState<any>(null);
    const [statusPembayaran, setStatusPembayaran] = useState({
        status: "",
        hitungHari: 0,
    });
    const [aktivitas, setAktivitas] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const getUnitInfo = async () => {
        const data = await UnitService.getUnitById(id);
        setUnitData(data[0] || null);
    }

    const [FormPembayaran, setFormPembayaran] = useState({
        id_kontrakan: "",
        jumlah_bulan: "",
        jumlah_kubik: "",
        total_bayar: 0,
        type_bayar: "",
        foto_meteran: null as File | null
    });



    const hitungBulan = async () => {
        const data = await UnitService.hitungBulan(id);
        setDate(data || "Belum ada data");
    }
    const getPembayaranTerbaru = async () => {
        const data = await UnitService.getPembayaranTerbaru(id);
        setDataPembayaranTerbaru(data || null);
    }


    const cekPembayaran = async () => {
        const data = await UnitService.cekPembayaran(id);
        setStatusPembayaran(data || "Belum ada data");
    }

    const getAktivitas = async () => {
        const data = await ActService.getAktivitasById(id);
        setAktivitas(data || []);
    }


    const tambahPembayaran = async () => {
        const data = await PaymentService.tambahPembayaran(FormPembayaran);
        if (data.error) {
            alert(data.error);
            return;
        }
        window.location.href = data.redirect_url;
    }

    useEffect(() => {
        getAktivitas();
        getUnitInfo();
        hitungBulan();
        getPembayaranTerbaru();
        cekPembayaran();
    }, []);

    useEffect(() => {
        const harga = unitData?.harga || 0;
        const total = FormPembayaran.type_bayar === "kontrakan"
            ? harga * Number(FormPembayaran.jumlah_bulan || 0)
            : Number(FormPembayaran.jumlah_kubik || 0) * 25000;

        setFormPembayaran(prev => ({
            ...prev,
            total_bayar: total,
            id_kontrakan: unitData?.id || ""
        }));
    }, [FormPembayaran.type_bayar, FormPembayaran.jumlah_bulan, FormPembayaran.jumlah_kubik, unitData]);

    return (
        <div className="relative justify-center">
            <div className="absolute top-0 left-0 z-0 bg-[#111A45] pt-24 h-74 w-full"></div>

            <div className="relative w-full mt-24 mx-auto lg:px-16 px-10">
                <div className="grid grid-cols-2">
                    <div>
                        <p className="text-white text-3xl font-bold">Halaman Utama</p>
                        <p className="text-gray-500 text-sm">Selamat datang di Dashboard 3R.</p>
                    </div>
                    <div className="justify-self-end">
                        <div className="flex gap-2">
                            <ButtonVar2 />
                            <ButtonVar1 onClick={() => { setModalOpen(true) }} text="Tambah Pembayaran" />
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
                        title="Status tagihan"
                        count={statusPembayaran.status || "-"}
                        subtitle={statusPembayaran.hitungHari ? ` ${statusPembayaran.hitungHari} Hari` : "-"}
                        icon={faHouse}
                        bigIcon={faBuildingUser}
                        iconColor="red"
                    />
                    <CardVar1
                        title="Detail"
                        count={unitData?.users?.nama_user || "-"}
                        subtitle="Berkeluarga"
                        icon={faHouse}
                        bigIcon={faBuildingUser}
                        iconColor="blue"
                    />
                </div>
                <div className="grid grid-cols-1 gap-5 mb-5">
                    <TableVar1
                        title="Aktivitas Terakhir"
                        deskripsi="Berikut adalah aktivitas terakhir yang terjadi di sistem."
                        isiTabel={["Aktivitas", "Waktu", "Nama"]}
                        dataTabel={aktivitas}
                    />
                </div>

                {
                    modalOpen && (
                        <ModalVar1
                            title="Tambah Pembayaran"
                            description="Silahkan isi data pembayaran di bawah ini."
                            onClose={() => setModalOpen(false)}
                            onSave={tambahPembayaran}
                        >
                            <InputDropdownVar2 name="type_bayar" onChange={(e) => setFormPembayaran({ ...FormPembayaran, type_bayar: e.target.value })} label="Type Bayar" placeholder="Masukkan type bayar" value={["air", "kontrakan"]} />
                            {FormPembayaran.type_bayar === "air" && (
                                <InputVar1 name="jumlah_kubik" onChange={(e) => setFormPembayaran({ ...FormPembayaran, jumlah_kubik: e.target.value })} label="Jumlah Kubik" type="text" placeholder="Masukkan jumlah kubik" />
                            )}
                            {FormPembayaran.type_bayar === "air" && (
                                <InputVar1
                                    label="Bukti Meteran air"
                                    type="file"
                                    placeholder="Masukkan bukti Meteran air"
                                    name="foto_meteran"
                                    onChange={() => { }}
                                    error={""}
                                />
                            )}
                            {FormPembayaran.type_bayar === "kontrakan" && (
                                <InputVar1 name="jumlah_bulan" onChange={(e) => setFormPembayaran({ ...FormPembayaran, jumlah_bulan: e.target.value })} label="Jumlah Bulan Kontrakan" type="text" placeholder="Masukkan jumlah bulan kontrakan" />
                            )}

                            <InputVar1
                                name="total_bayar"
                                value={FormPembayaran.total_bayar}
                                label="Total Tagihan"
                                type="text"
                                placeholder="Masukkan total tagihan"
                                readOnly
                            />
                        </ModalVar1>
                    )
                }
            </div>
        </div>
    );
}
