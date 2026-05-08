import { NextResponse } from 'next/server';
import { createClient } from '@/backend/db/supabaseServer';
import { AuthController } from '@/backend/controllers/authController';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const supabase = await createClient();
        const data = await AuthController.login(supabase, body);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
