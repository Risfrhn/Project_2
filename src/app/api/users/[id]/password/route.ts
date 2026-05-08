import { NextResponse } from 'next/server';
import { createClient } from '@/backend/db/supabaseServer';
import { UserController } from '@/backend/controllers/userController';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const supabase = await createClient();
        const data = await UserController.updatePasswordUser(supabase, id, body.password);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
