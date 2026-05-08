import { NextResponse } from 'next/server';
import { createClient } from '@/backend/db/supabaseServer';
import { UnitController } from '@/backend/controllers/unitController';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const supabase = await createClient();
        const data = await UnitController.getPembayaranByIdKontrakan(supabase, id);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const supabase = await createClient();
        const data = await UnitController.hapusDataPembayaran(supabase, id);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
