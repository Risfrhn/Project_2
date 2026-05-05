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


export default function DashboardUsersPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [date, setDate] = useState<string>("");
    const [dataPembayaranTerbaru, setDataPembayaranTerbaru] = useState<any>(null);
    const [dataNamaKontrakan, setDataNamaKontrakan] = useState<any>(null);
    const [statusPembayaran, setStatusPembayaran] = useState({
        status: "",
        hitungHari: 0,
    });
    const [aktivitas, setAktivitas] = useState<any[]>([]);



    const hitungBulan = async () => {
        const data = await UnitService.hitungBulan(id);
        setDate(data || "Belum ada data");
    }
    const getPembayaranTerbaru = async () => {
        const data = await UnitService.getPembayaranTerbaru(id);
        setDataPembayaranTerbaru(data || null);
    }

    const getNamaKontrakan = async () => {
        const data = await UnitService.getUnitById(id);
        setDataNamaKontrakan(data[0]?.users?.nama_user);
    }

    const cekPembayaran = async () => {
        const data = await UnitService.cekPembayaran(id);
        setStatusPembayaran(data || "Belum ada data");
    }

    const getAktivitas = async () => {
        const data = await ActService.getAktivitasById(id);
        setAktivitas(data || []);
    }

    useEffect(() => {
        getAktivitas();
        getNamaKontrakan();
        hitungBulan();
        getPembayaranTerbaru();
        cekPembayaran();
    }, []);

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
                            <ButtonVar1 onClick={() => { }} text="Tambah Pembayaran" />
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
                        count={dataNamaKontrakan || "-"}
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
            </div>
        </div>
    );
}
