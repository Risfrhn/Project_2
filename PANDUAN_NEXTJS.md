# Panduan Dasar Next.js (App Router & TypeScript)

Catatan ini berisi ringkasan mulai dari instalasi awal, cara menjalankan project, serta dasar-dasar pengembangan UI dalam Next.js menggunakan arsitektur modern (App Router).

## 1. Instalasi Awal Next.js dan TypeScript (Dari Nol)

Jika Anda ingin membuat project baru dari awal di masa depan, Anda hanya perlu menjalankan satu perintah menggunakan command line atau terminal:

```bash
npx create-next-app@latest
```

Anda akan otomatis diberikan pertanyaan menu interaktif. Untuk meniru konfigurasi yang kita gunakan di project ini, pilih opsi berikut:

- **What is your project named?** `nama-proyek` *(Catatan: hindari penggunaan huruf kapital/besar pada nama project)*
- **Would you like to use TypeScript?** `Yes`
- **Would you like to use ESLint?** `Yes`
- **Would you like to use Tailwind CSS?** `Yes`
- **Would you like your code inside a `src/` directory?** `Yes`
- **Would you like to use App Router?** `Yes`
- **Would you like to customize the default import alias?** `No` *(membiarkan default `@/*`)*

Next.js akan mengunduh semua package. Selanjutnya arahkan terminal ke dalam folder proyek (`cd nama-proyek`).

---

## 1.5. Menginstal Tailwind CSS ke Project yang Sudah Ada (Manual)

Jika suatu saat Anda memiliki project Next.js namun **belum** dipasang Tailwind CSS dari awal, Anda bisa mengikuti langkah manual ini:

1. Instal package Tailwind untuk Next.js dengan menjalankan perintah berikut di terminal:
   ```bash
   npm install tailwindcss @tailwindcss/postcss postcss
   ```
2. Buat file `postcss.config.mjs` di dalam folder root (di luar folder `src`) dan isi dengan:
   ```javascript
   export default {
     plugins: {
       "@tailwindcss/postcss": {},
     },
   };
   ```
3. Buka file utama CSS Anda (misalnya `src/app/globals.css`), lalu hapus semua definesi default dan tambahkan baris berikut:
   ```css
   @import "tailwindcss";
   ```

*(Catatan: Anda tidak perlu melakukan langkah manual ini jika Anda sudah memilih `Yes` pada opsi pemasangan Tailwind CSS saat menjalankan perintah `create-next-app` sebelumnya)*

---

## 2. Menjalankan Server Aplikasi
Project ini sudah dikonfigurasi penuh dengan TypeScript, Tailwind CSS, dan Next.js terbaru. 
Untuk menjalankan *Local Development Server*:
1. Buka terminal di folder project ini (tempat file `package.json` berada).
2. Ketik dan jalankan perintah: 
   ```bash
   npm run dev
   ```
3. Buka web browser Anda, masukkan alamat `http://localhost:3000`.

---

## 2. Membuat Halaman Baru dan Sistem Routing

Next.js App Router (berada di dalam folder `src/app`) menggunakan sistem *Routing Berbasis Folder*. Setiap folder baru di dalam `src/app` yang memiliki file bernama `page.tsx` akan secara otomatis menghasilkan tautan URL (Routing) baru.

**Contoh Kasus: Anda ingin membuat halaman `http://localhost:3000/tentang`**

1. Buat folder baru bernama **`tentang`** di dalam folder `src/app/`.
2. Di dalam folder `tentang` tersebut, buat sebuah file (namanya wajib **`page.tsx`**).
3. Isi `src/app/tentang/page.tsx` dengan kerangka React Component standar:

```tsx
// src/app/tentang/page.tsx
export default function TentangPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Halaman Tentang Kami</h1>
      <p className="mt-4 text-gray-600">Ini adalah contoh halaman baru yang terbuat secara otomatis lewat routing folder.</p>
    </main>
  );
}
```

---

## 3. Membuat Komponen (Components) UI yang Bisa Dipakai Ulang

Komponen adalah pecahan bagian UI (contoh: Navbar, Footer, Button, Card) yang bisa kita rakit di berbagai halaman. Sangat disarankan untuk menyimpan file komponen *terpisah* dari folder `app`. Praktik terbaiknya adalah membuat foldef `components` di dalam `src`.

**Contoh Kasus: Membuat Komponen Tombol (Button)**

1. Buat folder baru bernama **`components`** di dalam folder `src/` (sehingga rutenya menjadi `src/components`).
2. Di dalamnya, buat file komponen Anda, semisal **`TombolKhusus.tsx`**.
3. Tulis kode komponen tersebut:

```tsx
// src/components/TombolKhusus.tsx

// Menentukan struktur data ('Props') apa yang akan diterima komponen ini
interface PropsTombol {
  teks: string;
}

export default function TombolKhusus({ teks }: PropsTombol) {
  return (
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
      {teks}
    </button>
  );
}
```

---

## 4. Cara Memanggil (Importing) Komponen ke Halaman

Apapun komponen yang telah Anda buat, Anda harus melakukan `import` komponen tersebut ke file `page.tsx` manapun sebelum bisa menampilkannya.

**Contoh Kasus: Memanggil `TombolKhusus` ke Halaman Utama (`src/app/page.tsx`)**

Buka file halaman utama Anda di `src/app/page.tsx`, bersihkan isinya (kalau mau), lalu ubah menjadi seperti ini:

```tsx
// src/app/page.tsx

// 1. Memanggil komponen yang dibuat menggunakan mekanisme "Import Alias" (@) yang mengarah ke luar folder app
import TombolKhusus from "@/components/TombolKhusus";
// Catatan: "@/components/..." akan otomatis dibaca sebagai "src/components/..."

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-extrabold text-gray-900">Selamat datang di Next.js!</h1>
      
      <div className="flex gap-4">
        {/* 2. Menggunakan komponen layaknya tag HTML biasa dan mengoper variabel props */}
        <TombolKhusus teks="Klik Saya" />
        <TombolKhusus teks="Login" />
        <TombolKhusus teks="Daftar Sekarang" />
      </div>

    </main>
  );
}
```

### Tips Tambahan Komponen: Backend vs Client (Interaktif)
Karena kita menggunakan `App Router`, secara *default* semua file ditenagai oleh sisi server (*Server Components*). 
Artinya, kalau Anda punya fitur interaktif seperti **klik (onClick)** atau punya **state (useState)**, Anda WAJIB menambahkan `'use client';` di baris *paling atas* file komponen tersebut:

```tsx
'use client'; // WAJIB DI BARIS 1!

import { useState } from 'react';

export default function TombolInteraktif() {
   const [klik, setKlik] = useState(0);
   return <button onClick={() => setKlik(klik + 1)}>Klik: {klik}</button>
}
```
