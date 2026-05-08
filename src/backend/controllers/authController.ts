import { SupabaseClient } from '@supabase/supabase-js';
import { ActController } from './actController';

export const AuthController = {
    async login(supabase: SupabaseClient, payload: any) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: payload.email,
            password: payload.password
        })
        if (error) throw error

        const { data: user } = await supabase
            .from('users')
            .select('*')
            .eq('id', data?.user?.id)
            .single()

        if (!user) throw new Error("User tidak ditemukan");
        return user
    },

    async logout(supabase: SupabaseClient) {
        await supabase.auth.signOut();
        return true
    },

    async register(supabase: SupabaseClient, payload: any) {
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
                email: payload.email,
                role: payload.role
            });
        if (dbError) throw dbError
        await ActController.tambahAktivitas(supabase, {
            id: data?.user?.id,
            aktivitas: "Register",
            id_user: data?.user?.id,
        })
        return data
    },

    async getAllUser(supabase: SupabaseClient) {
        const { data, error } = await supabase
            .from('users')
            .select("*")
        if (error) throw error
        return data
    }
}
