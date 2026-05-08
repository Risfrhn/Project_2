import { NextResponse } from 'next/server';
import { createClient } from '@/backend/db/supabaseServer';
import { UserController } from '@/backend/controllers/userController';

export async function GET(request: Request) {
    const supabase = await createClient();
    const user = await UserController.getDataUserLogin(supabase);

    if (user) {
        // Redirect ke halaman utama user dengan ID-nya secara otomatis
        return NextResponse.redirect(new URL(`https://e58f-182-8-183-234.ngrok-free.app/page/users/halaman_utama/${user.id}`, request.url));
    }

    // Jika gagal deteksi user, balikkan ke home
    return NextResponse.redirect(new URL('/', request.url));
}
