"use server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getAllUserAdmin() {
    const { data, error } = await supabaseAdminClient
        .from('users')
        .select("*");
    if (error) throw error;
    return data;
}

export async function deleteUserAdmin(id: string) {
    const { error } = await supabaseAdminClient.auth.admin.deleteUser(id);
    if (error) throw error;
    return true;
}

export async function updatePasswordAdmin(id: string, password: string) {
    const { error } = await supabaseAdminClient.auth.admin.updateUserById(id, {
        password: password,
    });
    if (error) throw error;
    return true;
}