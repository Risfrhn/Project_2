import { NextResponse } from 'next/server';
import { createClient } from '@/backend/db/supabaseServer';
import { ActController } from '@/backend/controllers/actController';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const supabase = await createClient();
        const data = await ActController.getAktivitasById(supabase, id);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
