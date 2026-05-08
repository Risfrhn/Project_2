import { NextResponse } from 'next/server';
import { createClient } from '@/backend/db/supabaseServer';
import { AuthController } from '@/backend/controllers/authController';

export async function POST() {
    try {
        const supabase = await createClient();
        const data = await AuthController.logout(supabase);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
