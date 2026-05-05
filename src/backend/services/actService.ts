import { supabase } from '../db/supabase'

export const ActService = {
    async tambahAktivitas(payload: any) {
        const user = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('aktivitas')
            .insert({
                aktivitas: payload.aktivitas,
                id_user: user.data.user?.id,
            });
        if (error) throw error
        return data
    },

    async getAktivitas() {
        const { data, error } = await supabase
            .from('aktivitas')
            .select(`
                *,
                users (nama_user, role)
            `)
            .order('created_at', { ascending: false })
        if (error) throw error
        return data
    },


    async getAktivitasById(id: string) {
        const { data, error } = await supabase
            .from('aktivitas')
            .select(`
                *`)
            .eq('id_user', id)
            .order('created_at', { ascending: false })
        if (error) throw error
        return data
    }
}
