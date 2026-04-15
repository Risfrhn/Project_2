import { supabase } from '../db/supabase';
import { ActService } from '@/backend/services/actService';

export const UnitService = {
    async tambahUnit(payload: any) {
        const { data, error } = await supabase
            .from('kontrakan')
            .insert({
                nama_kontrakan: payload.nama_kontrakan,
                status_kontrakan: "kosong",
            });
        if (error) throw error
        await ActService.tambahAktivitas({
            aktivitas: `Tambah Unit ${payload.nama_kontrakan}`,
            id_user: payload.id_user,
        })
        return data
    },

    async getAllUnit() {
        const { data, error } = await supabase
            .from('kontrakan')
            .select('*');
        if (error) throw error
        return data
    },
}