"use client";

import NavigasiDasboardVar1 from "@/app/components/navigasi_bar/navigasi_var_1";
import ButtonVar1 from "@/app/components/button/button_var_1";
import ButtonVar2 from "@/app/components/button/button_var_2";
import CardVar1 from "@/app/components/card/card_var_1";
import TableVar1 from "@/app/components/table/table_var_1";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBuildingUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ModalVar1 from "@/app/components/modal/modal_var_1";
import InputVar1 from "@/app/components/input/input_var_1";
import InputDropdownVar2 from "@/app/components/input/input_dropdown_var_2";
import { AuthService } from "@/backend/services/authService";
import { ActService } from "@/backend/services/actService";



export default function DashboardBosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    nama_user: "",
    role: "",
  });
  const [aktivitas, setAktivitas] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      if (!form.email || !form.password) {
        alert("Email dan password tidak boleh kosong!");
        return;
      }

      await AuthService.register(form);
      setIsModalOpen(false);
      await handleGetAktivitas();
    } catch (error: any) {
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const handleGetAktivitas = async () => {
    try {
      const data = await ActService.getAktivitas();
      setAktivitas(data || []);
    } catch (error: any) {
      alert("Gagal mengambil data: " + error.message);
    }
  };

  useEffect(() => {
    handleGetAktivitas();
  }, []);

  return (
    <div className="relative justify-center">
      <div className="absolute top-0 left-0 z-0 bg-[#111A45] pt-24 h-74 w-full"></div>
      <div className="relative z-40">
        <NavigasiDasboardVar1 />
      </div>
      <div className="relative w-full mt-24 mx-auto lg:px-16 px-10">
        <div className="grid grid-cols-2">
          <div>
            <p className="text-white text-3xl font-bold">Halaman Utama</p>
            <p className="text-gray-500 text-sm">Selamat datang di Dashboard 3R.</p>
          </div>
          <div className="justify-self-end">
            <div className="flex gap-2">
              <ButtonVar2 />
              <ButtonVar1 onClick={() => setIsModalOpen(true)} />
              {
                isModalOpen && (
                  <ModalVar1
                    title="Tambah User"
                    description="Silahkan isi data user di bawah ini."
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleRegister}
                  >
                    <InputVar1 name="nama_user" onChange={handleChange} label="Nama" type="text" placeholder="Masukkan nama" />
                    <InputVar1 name="email" onChange={handleChange} label="Email" type="email" placeholder="Masukkan email" />
                    <InputVar1 name="password" onChange={handleChange} label="Password" type="password" placeholder="Masukkan password" />
                    <InputDropdownVar2 name="role" onChange={handleChange} label="Role" placeholder="Masukkan role" value={["kontrakan_1", "kontrakan_2", "kontrakan_3", "boss"]} />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <TableVar1
            title="Aktivitas Keuangan"
            deskripsi="Berikut adalah aktivitas keuangan yang terjadi di sistem."
            isiTabel={["Aktivitas", "Jumlah", "Status"]}
            dataTabel={[]}
          />
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
