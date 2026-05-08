import { NextResponse } from "next/server";
import { supabaseAdminClient } from "@/backend/db/supabaseAdmin";
import { PaymentController } from "@/backend/controllers/paymentController";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Gunakan admin client untuk melewati RLS pada webhook
        const data = await PaymentController.webhookPayment(supabaseAdminClient, body);

        if (!data.success) {
            return NextResponse.json(data, { status: 400 });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}