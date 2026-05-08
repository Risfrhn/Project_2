"use client";


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
import { AuthService } from "@/backend/services/authService";
import InputVar1 from "@/app/components/input/input_var_1";
import AlertVar1 from "@/app/components/alert/alert_var_1";
import ModalVar2 from "@/app/components/modal/modal_var_2";
import InputDropdownVar2 from "@/app/components/input/input_dropdown_var_2";
import BreadcrumbsButtonVar1 from "@/app/components/breadcrumbs/breadcrumbs_button_var_1";
import { useRouter } from "next/navigation";


export default function DashboardBosPage() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [idUnit, setIdUnit] = useState("");
    const [unit, setUnit] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [form, setForm] = useState({
        nama_kontrakan: "",
        harga: "",
    });
    const [formEdit, setFormEdit] = useState({
        nama_kontrakan: "",
        harga: "",
        id_user: "",
    });
    const [dataKontrakan, setDataKontrakan] = useState<any[]>([]);
    const [persenKontrakan, setPersenKontrakan] = useState<number>(0);
    const [jumlahUser, setJumlahUser] = useState<number>(0);

    const handleTambahUnit = async () => {
        try {
            await UnitService.tambahUnit(form);
            setIsModalOpen(false);
            await getAllUnit();
            setForm({
                nama_kontrakan: "",
                harga: "",
            });
        } catch (error) {
            console.error("Error tambah unit:", error);
        }
    }

    const getAllUnit = async () => {
        try {
            const data = await UnitService.getAllUnit();
            setUnit(data || []);
        } catch (error) {
            console.error("Error get all unit:", error);
        }
    }

    const getAllUser = async () => {
        try {
            const data = await AuthService.getAllUser();
            setUsers(data || []);
        } catch (error) {
            console.error("Error get all user:", error);
        }
    }

    const getAllDataKontrakan = async () => {
        const data = await UnitService.getAllUnit();
        setDataKontrakan(data);
    }

    const hitungPersenKontrakan = async () => {
        const hitung = dataKontrakan.filter((item) => item.status_kontrakan === "terisi").length;
        const persen = hitung / dataKontrakan.length * 100;
        setPersenKontrakan(persen);
    }

    const getJumlahUser = async () => {
        const data = await AuthService.getAllUser();
        setJumlahUser(data.length);
    }

    const handleHapusUnit = async () => {
        try {
            if (!idUnit) return;
            await UnitService.hapusUnit(idUnit);
            await getAllUnit();
            setIsAlertOpen(false);
            setIdUnit("");
        } catch (error) {
            console.error("Error hapus unit:", error);
        }
    }

    const handleUpdateUnit = async () => {
        try {
            if (!idUnit) return;
            const payload: any = {};

            if (formEdit.nama_kontrakan.trim() !== "") {
                payload.nama_kontrakan = formEdit.nama_kontrakan;
            }

            if (formEdit.id_user.trim() !== "") {
                payload.id_user = formEdit.id_user;
            }

            if (!payload.nama_kontrakan && !payload.id_user) {
                setIsModalEditOpen(false);
                return;
            }

            await UnitService.updateUnit(idUnit, payload)
            await getAllUnit();
            setIsModalEditOpen(false);
            setIdUnit("");
            setFormEdit({
                nama_kontrakan: "",
                harga: "",
                id_user: "",
            });

        } catch (error) {
            console.error("Error hapus unit:", error);
        }
    }

    const handleChangePenghuni = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLabel = e.target.value;
        const selectedUser = (users || []).find(
            (item) => (item?.nama_user || item?.email) === selectedLabel
        );

        setFormEdit((prev) => ({
            ...prev,
            id_user: selectedUser?.id || "",
        }));
    };

    const selectedPenghuniLabel = (users || []).find(
        (item) => item?.id === formEdit.id_user
    )?.nama_user || (users || []).find(
        (item) => item?.id === formEdit.id_user
    )?.email || "";

    useEffect(() => {
        getAllUnit();
        getAllUser();
    }, []);

    return (
        <div className="relative justify-center">
            <div className="absolute top-0 left-0 z-0 bg-[#111A45] pt-24 h-74 w-full"></div>

            <div className="relative mt-24 z-10 mx-auto lg:px-16 px-10">
                <div className="grid grid-cols-1 mb-1">
                    <BreadcrumbsButtonVar1
                        items={[
                            { title: "Halaman Utama", onClick: () => { router.push("/page/admin_page/halaman_utama") } },
                            { title: "Kontrakan", onClick: () => { } },
                        ]}
                    />
                </div>
                <div className="grid grid-cols-2">
                    <div>
                        <p className="text-white text-3xl font-bold">Kontrakan</p>
                        <p className="text-gray-500 text-sm">Halaman ini menampilkan data kontrakan.</p>
                    </div>
                    <div className="justify-self-end">
                        <div className="flex gap-2">
                            <ButtonVar2 />
                            <ButtonVar1 onClick={() => setIsModalOpen(true)} text="Tambah Data" />
                            {
                                isModalOpen && (
                                    <ModalVar1
                                        title="Tambah Kontrakan"
                                        description="Silahkan isi data kontrakan di bawah ini."
                                        onClose={() => setIsModalOpen(false)}
                                        onSave={() => { handleTambahUnit() }}
                                    >
                                        <>
                                            <InputVar1
                                                label="Nama Kontrakan"
                                                type="text"
                                                placeholder="Masukkan nama kontrakan"
                                                name="nama_kontrakan"
                                                value={form.nama_kontrakan}
                                                onChange={(e) => setForm({ ...form, nama_kontrakan: e.target.value })}
                                            />
                                            <InputVar1
                                                label="Harga kontrakan"
                                                type="number"
                                                placeholder="Masukkan harga kontrakan"
                                                name="harga"
                                                value={form.harga}
                                                onChange={(e) => setForm({ ...form, harga: e.target.value })}
                                            />
                                        </>

                                    </ModalVar1>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-5">
                    <CardVar1
                        title="Kontrakan"
                        count={dataKontrakan.length || 0}
                        subtitle={persenKontrakan ? `${persenKontrakan}% Terisi` : "Belum terisi"}
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
                        title="Users"
                        count={jumlahUser || 0}
                        subtitle="Total Users"
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
                        renderAksi={(item) => (
                            <div className="flex gap-2">
                                <ButtonVar3
                                    iconButton={faWater}
                                    color="blue"
                                    onClick={() => {
                                        router.push(`/page/admin_page/tagihan_air/${item.id}`);
                                    }}
                                />
                                <ButtonVar3
                                    iconButton={faBook}
                                    color="yellow"
                                    onClick={() => {
                                        router.push(`/page/admin_page/pembayaran_page/${item.id}`);
                                    }}
                                />
                                <ButtonVar3
                                    iconButton={faPenToSquare}
                                    color="green"
                                    onClick={() => {
                                        setFormEdit({
                                            nama_kontrakan: item?.nama_kontrakan || "",
                                            harga: item?.harga || "",
                                            id_user: item?.id_user || "",
                                        });
                                        setIsModalEditOpen(true);
                                        setIdUnit(item.id);
                                    }}
                                />
                                <ButtonVar3
                                    iconButton={faTrashCan}
                                    color="red"
                                    onClick={() => {
                                        setIdUnit(item.id);
                                        setIsAlertOpen(true);
                                    }}
                                />
                            </div>
                        )}
                    />
                </div>
                {isModalEditOpen && (
                    <ModalVar2
                        title="Edit Kontrakan"
                        description="Silahkan ubah data kontrakan di bawah ini."
                        onClose={() => { setIsModalEditOpen(false) }}
                        onSave={() => { handleUpdateUnit() }}
                    >
                        <>
                            <InputVar1
                                label="Nama Kontrakan"
                                type="text"
                                placeholder="Ganti nama kontrakan"
                                name="nama_kontrakan"
                                value={formEdit.nama_kontrakan}
                                onChange={(e) =>
                                    setFormEdit((prev) => ({
                                        ...prev,
                                        nama_kontrakan: e.target.value,
                                    }))
                                }
                            />
                            <InputVar1
                                label="Harga kontrakan"
                                type="number"
                                placeholder="Ganti harga kontrakan"
                                name="harga"
                                value={formEdit.harga}
                                onChange={(e) =>
                                    setFormEdit((prev) => ({
                                        ...prev,
                                        nama_kontrakan: e.target.value,
                                    }))
                                }
                            />
                            <InputDropdownVar2
                                name="id_user"
                                onChange={handleChangePenghuni}
                                label="Penghuni"
                                placeholder="Masukkan penghuni"
                                selectedValue={selectedPenghuniLabel}
                                value={(users || []).map((item) => item?.nama_user || item?.email).filter(Boolean)}
                            />
                        </>
                    </ModalVar2>
                )}
                {isAlertOpen && (
                    <AlertVar1
                        title="Hapus Kontrakan"
                        description="Apakah anda yakin ingin menghapus data kontrakan ini?"
                        onClose={() => setIsAlertOpen(false)}
                        onSave={() => { handleHapusUnit() }}
                    />
                )}
            </div>
        </div>
    );
}
