import { NextResponse } from 'next/server';
import { createClient } from '@/backend/db/supabaseServer';
import { UnitController } from '@/backend/controllers/unitController';

export async function GET() {
    try {
        const supabase = await createClient();
        const data = await UnitController.getAllUnit(supabase);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const supabase = await createClient();
        const data = await UnitController.tambahUnit(supabase, body);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
