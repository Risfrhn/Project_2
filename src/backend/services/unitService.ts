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
            .select(`
                *,
                users (*)
            `);
        if (error) throw error
        return data
    },
    

    async hapusUnit(id: string) {
        const user = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('kontrakan')
            .delete()
            .eq('id', id);
        await ActService.tambahAktivitas({
            aktivitas: "Hapus Unit",
            id_user: user.data.user?.id,
        })
        if (error) throw error
        return data
    },

    async updateUnit(id: string, payload:any){
        const user = await supabase.auth.getUser();
        if (payload.id_user) {
            payload.status_kontrakan = "terisi";
        } else {
            payload.status_kontrakan = "kosong";
        }
        const{data, error} = await supabase 
            .from('kontrakan')
            .update(payload)
            .eq('id', id);
        await ActService.tambahAktivitas({
            aktivitas: `Update data unit ${payload.nama_kontrakan}`,
            id_user: user.data.user?.id,
        });
        if (error) throw error
        return data;
    }
}