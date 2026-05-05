import { supabase } from "../db/supabase"


export const PaymentService = {
    async tambahPembayaran(payload: any) {
        const { data, error } = await supabase
            .from('pembayaran_kontrakan')
            .insert(payload);
        if (error) throw error
        return data
    },
}