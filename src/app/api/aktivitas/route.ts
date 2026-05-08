import { NextResponse } from 'next/server';
import { createClient } from '@/backend/db/supabaseServer';
import { ActController } from '@/backend/controllers/actController';

export async function GET() {
    try {
        const supabase = await createClient();
        const data = await ActController.getAktivitas(supabase);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const supabase = await createClient();
        const data = await ActController.tambahAktivitas(supabase, body);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
