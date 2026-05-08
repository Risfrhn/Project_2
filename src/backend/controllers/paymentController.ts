import { SupabaseClient } from '@supabase/supabase-js'
import midtransClient from "midtrans-client";
import crypto from 'crypto';
import { NextRequest } from 'next/server';

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export const PaymentController = {
    async tambahPembayaran(supabase: SupabaseClient, payload: any) {
        const user = await supabase.auth.getUser();
        const orderId = "ORD-" + payload.type_bayar + "-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9).toUpperCase();
        const { error } = await supabase
            .from('transaksi')
            .insert({
                id: orderId,
                id_user_pembayar: user.data?.user?.id,
                type_bayar: payload.type_bayar,
                id_kontrakan: payload.id_kontrakan,
                total_bayar: payload.total_bayar,
                jumlah_bulan: Number(payload.jumlah_bulan),
                jumlah_kubik: Number(payload.jumlah_kubik),
                foto_meteran: payload.foto_meteran,
                status_pembayaran: "pending",
            });
        if (error) throw error

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: Number(payload.total_bayar),
            },

            customer_details: {
                first_name: user.data?.user?.email,
                email: user.data?.user?.email,
            },
            callbacks: {
                finish: `https://e58f-182-8-183-234.ngrok-free.app/api/pembayaran/finish`,
                unfinish: `https://e58f-182-8-183-234.ngrok-free.app/api/pembayaran/finish`,
                error: `https://e58f-182-8-183-234.ngrok-free.app/api/pembayaran/finish`
            }
        }
        const transaction = await snap.createTransaction(parameter);
        return {
            success: true,
            redirect_url: transaction.redirect_url,
            token: transaction.token
        };
    },


    async webhookPayment(supabase: SupabaseClient, body: any) {
        try {
            console.log("--- Webhook Midtrans Received ---");
            console.log("Body:", JSON.stringify(body, null, 2));

            const id_order = body.order_id;
            const status_code = body.status_code;
            const gross_amount = body.gross_amount;
            const signature_key = body.signature_key;
            const server_key = process.env.MIDTRANS_SERVER_KEY;

            // Verify signature
            const hash = crypto.createHash('sha512')
                .update(`${id_order}${status_code}${gross_amount}${server_key}`)
                .digest('hex');

            console.log("Calculated Hash:", hash);
            console.log("Signature Key:", signature_key);

            if (hash !== signature_key) {
                console.error("Invalid Midtrans signature!");
                return { success: false, error: "Invalid signature" };
            }

            const status = body.transaction_status;
            let paymentStatus = "pending";

            if (status === "settlement" || status === "capture") {
                paymentStatus = "success";
            } else if (
                status === "deny" ||
                status === "cancel" ||
                status === "expire"
            ) {
                paymentStatus = "failed";
            } else if (status === "pending") {
                paymentStatus = "pending";
            }

            console.log(`Updating order ${id_order} to status: ${paymentStatus}`);

            const { error } = await supabase
                .from('transaksi')
                .update({
                    status_pembayaran: paymentStatus,
                })
                .eq('id', id_order);

            if (error) {
                console.error("Database update error:", error);
                throw error;
            }

            console.log("Database updated successfully");

            return {
                success: true
            }
        } catch (error: any) {
            console.error("Webhook error details:", error);
            return { success: false, error: error.message };
        }
    }
}
