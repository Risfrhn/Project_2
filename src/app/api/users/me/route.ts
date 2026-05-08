import { NextResponse } from 'next/server';
import { createClient } from '@/backend/db/supabaseServer';
import { UserController } from '@/backend/controllers/userController';

export async function GET() {
    try {
        const supabase = await createClient();
        const data = await UserController.getDataUserLogin(supabase);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
