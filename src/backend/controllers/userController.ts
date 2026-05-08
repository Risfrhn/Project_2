import { SupabaseClient } from "@supabase/supabase-js";
import { ActController } from './actController'
import { getAllUserAdmin, deleteUserAdmin, updatePasswordAdmin } from "../db/supabaseAdmin";

export const UserController = {
    async getAllUser() {
        return await getAllUserAdmin();
    },

    async getDataUserLogin(supabase: SupabaseClient) {
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

    async getDataUserById(supabase: SupabaseClient, id: string) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error
        return data
    },

    async hapusDataUser(supabase: SupabaseClient, id: string) {
        const user = await this.getDataUserLogin(supabase)
        await ActController.tambahAktivitas(supabase, {
            aktivitas: `Hapus User ${user?.nama_user}`,
            id_user: user?.id,
        });

        const { error: hapusUserError } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (hapusUserError) throw hapusUserError
        await deleteUserAdmin(id);
        return true;
    },

    async updatePasswordUser(supabase: SupabaseClient, id: string, password: string) {
        const user = await this.getDataUserLogin(supabase);

        await ActController.tambahAktivitas(supabase, {
            aktivitas: "Update Password User",
            id_user: user?.id,
        });

        return await updatePasswordAdmin(id, password);
    }
}
