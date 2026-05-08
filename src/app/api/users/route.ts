import { NextResponse } from 'next/server';
import { UserController } from '@/backend/controllers/userController';

export async function GET() {
    try {
        const data = await UserController.getAllUser();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
