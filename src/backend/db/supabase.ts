import { createClient } from '@supabase/supabase-js'

// Pastikan kamu menyiapkan file .env.local dengan isi variabel di bawah ini
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''


if (!supabaseUrl) {
    throw new Error(
        "Supabase URL tidak ditemukan. Pastikan NEXT_PUBLIC_SUPABASE_URL sudah diset dengan benar di file .env.local Anda."
    );
}
if (!supabaseKey) {
    throw new Error(
        "Supabase Anon Key tidak ditemukan. Pastikan NEXT_PUBLIC_SUPABASE_ANON_KEY sudah diset dengan benar di file .env.local Anda."
    );
}

// Inisialisasi koneksi utama Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)
