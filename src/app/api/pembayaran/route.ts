import { NextResponse } from 'next/server';
import { createClient } from '@/backend/db/supabaseServer';
import { UnitController } from '@/backend/controllers/unitController';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const supabase = await createClient();
        const data = await UnitController.tambahPembayaran(supabase, formData);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
