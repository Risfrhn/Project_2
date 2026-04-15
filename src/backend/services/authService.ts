import { supabase } from '../db/supabase';
import { ActService } from '@/backend/services/actService';

export const AuthService = {
    async login(payload: any) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password
        })
        if (error) throw error
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data?.user?.id)
        if (userError) throw userError
        await ActService.tambahAktivitas({
            id: data?.user?.id,
            aktivitas: "Login",
            id_user: data?.user?.id,
        })
        return user
    },



    async register(payload: any) {
        const { data, error } = await supabase.auth.signUp({
            email: payload.email,
            password: payload.password,
        })
        if (error) throw error
        const { error: dbError } = await supabase
            .from('users')
            .insert({
                id: data?.user?.id,
                nama_user: payload.nama_user,
                role: payload.role
            });
        if (dbError) throw dbError
        await ActService.tambahAktivitas({
            id: data?.user?.id,
            aktivitas: "Register",
            id_user: data?.user?.id,
        })
        return data
    }
}
