import { supabase } from "../db/supabase";
import { ActService } from '@/backend/services/actService'
import { getAllUserAdmin, deleteUserAdmin, updatePasswordAdmin } from "../db/supabaseAdmin";

export const UserService = {
    async getAllUser() {
        return await getAllUserAdmin();
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

    async getDataUserById(id: string) {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error
        return data
    },


    async hapusDataUser(id: string) {

        // Ambil data user login
        const user = await this.getDataUserLogin()
        await ActService.tambahAktivitas({
            aktivitas: `Hapus User ${user?.nama_user}`,
            id_user: user?.id,
        });

        // Hapus data di table users
        const { error: hapusUserError } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (hapusUserError) throw hapusUserError
        await deleteUserAdmin(id);
        return true;
    },

    async updatePasswordUser(id: string, password: string) {
        // Ambil data user login
        const user = await this.getDataUserLogin();

        // tambah aktivitas
        await ActService.tambahAktivitas({
            aktivitas: "Update Password User",
            id_user: user?.id,
        });

        // ubah password
        return await updatePasswordAdmin(id, password);
    }
}