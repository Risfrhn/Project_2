import { SupabaseClient } from '@supabase/supabase-js'

export const ActController = {
    async tambahAktivitas(supabase: SupabaseClient, payload: any) {
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

    async getAktivitas(supabase: SupabaseClient) {
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

    async getAktivitasById(supabase: SupabaseClient, id: string) {
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
