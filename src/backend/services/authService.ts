import { supabase } from '../db/supabase';
import { ActService } from '@/backend/services/actService';

export const AuthService = {
    async login(payload: any) {
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

        await ActService.tambahAktivitas({
            id: data?.user?.id,
            aktivitas: "Login",
            id_user: data?.user?.id,
        })
        return user
    },

    async getDataUserLogin() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single();
        if (error) return null;
        return data
    },

    async logout() {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await ActService.tambahAktivitas({
                aktivitas: "Logout",
                id_user: user.id,
            })
        }
        await supabase.auth.signOut();
        return true
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
                email: payload.email,
                role: payload.role
            });
        if (dbError) throw dbError
        await ActService.tambahAktivitas({
            id: data?.user?.id,
            aktivitas: "Register",
            id_user: data?.user?.id,
        })
        return data
    },

    async getAllUser() {
        const { data, error } = await supabase
            .from('users')
            .select("*")
        if (error) throw error
        return data
    }
}
