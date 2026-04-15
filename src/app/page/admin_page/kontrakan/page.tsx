"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigasiDasboardVar1 from "@/app/components/navigasi_bar/navigasi_var_1";
import ButtonVar1 from "@/app/components/button/button_var_1";
import ButtonVar2 from "@/app/components/button/button_var_2";
import ButtonVar3 from "@/app/components/button/button_var_3";
import CardVar1 from "@/app/components/card/card_var_1";
import TableVar3 from "@/app/components/table/table_var_3";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBuildingUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ModalVar1 from "@/app/components/modal/modal_var_1";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { UnitService } from "@/backend/services/unitService";
import InputVar1 from "@/app/components/input/input_var_1";



export default function DashboardBosPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [unit, setUnit] = useState<any[]>([]);
    const [form, setForm] = useState({
        nama_kontrakan: "",
    });

    const handleTambahUnit = async () => {
        try {
            await UnitService.tambahUnit(form);
            setIsModalOpen(false);
            setForm({
                nama_kontrakan: "",
            });
        } catch (error) {
            console.error("Error tambah unit:", error);
        }
    }

    const getAllUnit = async () => {
        try {
            const data = await UnitService.getAllUnit();
            console.log(data);
            setUnit(data || []);
        } catch (error) {
            console.error("Error get all unit:", error);
        }
    }

    useEffect(() => {
        getAllUnit();
    }, []);

    return (
        <div className="relative justify-center">
            <div className="absolute top-0 left-0 z-0 bg-[#111A45] pt-24 h-74 w-full"></div>
            <div className="relative z-40">
                <NavigasiDasboardVar1 />
            </div>
            <div className="container relative mt-24 z-10 mx-auto px-5 md:px-10">
                <div className="grid grid-cols-2">
                    <div>
                        <p className="text-white text-3xl font-bold">Kontrakan</p>
                        <p className="text-gray-500 text-sm">Halaman ini menampilkan data kontrakan.</p>
                    </div>
                    <div className="justify-self-end">
                        <div className="flex gap-2">
                            <ButtonVar2 />
                            <ButtonVar1 onClick={() => setIsModalOpen(true)} />
                            {
                                isModalOpen && (
                                    <ModalVar1
                                        title="Tambah Kontrakan"
                                        description="Silahkan isi data kontrakan di bawah ini."
                                        onClose={() => setIsModalOpen(false)}
                                        onSave={() => { handleTambahUnit() }}
                                    >
                                        <InputVar1
                                            label="Nama Kontrakan"
                                            type="text"
                                            placeholder="Masukkan nama kontrakan"
                                            name="nama_kontrakan"
                                            value={form.nama_kontrakan}
                                            onChange={(e) => setForm({ ...form, nama_kontrakan: e.target.value })}
                                        />

                                    </ModalVar1>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-5">
                    <CardVar1
                        title="Kontrakan"
                        count="3"
                        subtitle="100% Terisi"
                        icon={faHouse}
                        bigIcon={faBuildingUser}
                        iconColor="blue"
                    />
                    <CardVar1
                        title="Keuangan"
                        count="Rp 10.000.000"
                        subtitle="Total Pemasukan"
                        icon={faHouse}
                        bigIcon={faBuildingUser}
                        iconColor="red"
                    />
                    <CardVar1
                        title="Keluhan"
                        count="3"
                        subtitle="Laporan Masuk"
                        icon={faHouse}
                        bigIcon={faBuildingUser}
                        iconColor="blue"
                    />
                </div>
                <div className="grid grid-cols-1 mb-5">
                    <TableVar3
                        title="List kontrakan"
                        deskripsi="Berikut adalah list kontrakan yang terdaftar."
                        isiTabel={["Nama Kontrakan", "Penghuni", "Status Kontrakan", "Status Air", "Expired Date", "Aksi"]}
                        dataTabel={unit}

                        children={
                            <div className="flex gap-2">
                                <ButtonVar3 iconButton={faWater} color="blue" />
                                <ButtonVar3 iconButton={faBook} color="yellow" />
                                <ButtonVar3 iconButton={faPenToSquare} color="green" />
                                <ButtonVar3 iconButton={faTrashCan} color="red" />
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}
