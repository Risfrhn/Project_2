import { NextResponse } from 'next/server';
import { createClient } from '@/backend/db/supabaseServer';
import { UnitController } from '@/backend/controllers/unitController';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id_kontrakan = searchParams.get('id_kontrakan');
        if (!id_kontrakan) throw new Error("Missing id_kontrakan");
        const supabase = await createClient();
        const data = await UnitController.hitungTotalTagihan(supabase, id_kontrakan);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
