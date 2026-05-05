"use client";

import InputVar1 from "./components/input/input_var_1";
import { useState } from "react";
import { AuthService } from "@/backend/services/authService";
import { useRouter } from "next/navigation";
import type { Route } from "next";

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (errorMsg) setErrorMsg("");
  };

  const handleLogin = async () => {
    try {
      if (!form.email.trim() || !form.password.trim()) {
        setErrorMsg("Email dan password wajib diisi.");
        return;
      }
      setLoading(true);
      setErrorMsg("");
      const data = await AuthService.login(form);
      if (data.role === "super_bos") {
        router.push("/page/admin_page/halaman_utama" as Route);
      } else {
        router.push(`/page/users/halaman_utama/${data.id}` as Route);
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "Gagal masuk. Silahkan periksa kembali email dan password Anda.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50/30 overflow-hidden relative">

      <div className="absolute top-[-10%] left-[-10%] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-blue-200/50 rounded-full filter blur-[100px] lg:blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-indigo-200/50 rounded-full filter blur-[120px] lg:blur-[150px]"></div>
      <div className="absolute top-[0%] left-[20%] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-blue-300/30 rounded-full mix-blend-multiply filter blur-[80px] lg:blur-[100px] pointer-events-none"></div>
      <div className="absolute top-10 right-[5%] w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-[80px] lg:blur-[100px] pointer-events-none"></div>

      {/* Main Grid Layout Container */}
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 min-h-screen flex items-center justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 w-full max-w-6xl py-12 lg:py-0">

          {/* Kolom Kiri: Informasi / Branding */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] leading-tight font-extrabold mb-5 lg:mb-6 tracking-tight text-gray-900">
                Kelola Kontrakan
              </h1>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
                Aplikasi untuk membantu Anda mengelola kontrakan dengan lebih mudah, cepat, dan terukur. Solusi terbaik untuk manajemen keuangan yang transparan.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center order-1 lg:order-2 w-full">
            {/* Box Auth (Elevated White Card) */}
            <div className="bg-white/80 backdrop-blur-2xl w-full max-w-[420px] p-7 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] border border-gray-100/50">
              <div className="mb-6 sm:mb-8 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Masuk</h2>
                <p className="text-sm text-gray-400">Silahkan isi form di bawah untuk membuat akun baru.</p>
              </div>

              <div className="flex flex-col gap-5 sm:gap-6">
                <InputVar1
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  label="Email"
                  type="email"
                  placeholder="Masukkan email"
                />
                <InputVar1
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  placeholder="Masukkan password"
                />


                {errorMsg && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errorMsg}
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-3.5 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Memproses...
                    </>
                  ) : (
                    "Masuk Ke Kontrakan"
                  )}
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
