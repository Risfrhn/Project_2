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

    async updateUnit(id: string, payload: any) {
        const user = await supabase.auth.getUser();
        if (payload.id_user) {
            payload.status_kontrakan = "terisi";
        } else {
            payload.status_kontrakan = "kosong";
        }
        const { data, error } = await supabase
            .from('kontrakan')
            .update(payload)
            .eq('id', id);
        await ActService.tambahAktivitas({
            aktivitas: `Update data unit ${payload.nama_kontrakan}`,
            id_user: user.data.user?.id,
        });
        if (error) throw error
        return data;
    },

    async getUnitById(id: string) {
        const { data, error } = await supabase
            .from('kontrakan')
            .select(`
                *,
                pembayaran_kontrakan (*)
            `)
            .eq('id_kontrakan', id);
        if (error) throw error
        return data
    },


    // PEMBAYARAN KONTRAKAN
    async simpanGambar(file: File, table: string) {
        const dataGambar = file;
        if (!dataGambar) return;
        const { data, error } = await supabase
            .storage
            .from(table)
            .upload(dataGambar.name, dataGambar);
        if (error) throw error
        return data
    },
    async tambahPembayaran(payload: any) {
        const file = payload.get('bukti_pembayaran');
        const { data, error } = await supabase
            .from('pembayaran_kontrakan')
            .insert({
                id_kontrakan: payload.get('id_kontrakan'),
                tanggal_bayar: payload.get('tanggal_bayar'),
                bulan: payload.get('bulan'),
                jumlah_bayar: payload.get('jumlah_bayar'),
                bukti_pembayaran: file.name,
            });
        await this.simpanGambar(file, 'bukti_transaksi_kontrakan');
        if (error) throw error
        const { data: data_Kontrakan, error: errorKontrakan } = await supabase
            .from('kontrakan')
            .select('*')
            .eq('id', payload.get('id_kontrakan'));
        if (errorKontrakan) throw errorKontrakan
        const user = await supabase.auth.getUser();
        await ActService.tambahAktivitas({
            aktivitas: `Tambah Pembayaran ${data_Kontrakan[0].nama_kontrakan}`,
            id_user: user.data.user?.id,
        })
        return data
    },

    async getPembayaranByIdKontrakan(id: string) {
        const { data, error } = await supabase
            .from('pembayaran_kontrakan')
            .select(`
                *,
                kontrakan (*)
            `)
            .eq('id_kontrakan', id);
        if (error) throw error
        return data
    },

    async getPembayaranTerbaru(id: string) {
        const { data, error } = await supabase
            .from('pembayaran_kontrakan')
            .select(`
                *,
                kontrakan (*)
            `)
            .eq('id_kontrakan', id)
            .order('tanggal_bayar', { ascending: false })
            .limit(1)
            .maybeSingle()
        if (error) throw error
        return data
    },

    async hitungBulan(id: string) {
        const data = await this.getPembayaranTerbaru(id);
        if (!data) {
            return null;
        }
        const tanggalAwal = data.tanggal_bayar;
        const tgl = new Date(tanggalAwal);
        const tanggalJatuhTempo = data.bulan;

        const result = new Date(
            tgl.getFullYear(),
            tgl.getMonth() + tanggalJatuhTempo,
            tgl.getDate()
        );

        const formatted = result.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        return formatted;
    },

    async hitungTotalBayarById(id: string) {
        const data = await this.getPembayaranByIdKontrakan(id);
        let total = 0;
        for (const item of data) {
            total += item.jumlah_bayar || 0;
        }
        return total;
    },

    async hapusDataPembayaran(id: string) {
        const { data, error } = await supabase
            .from('pembayaran_kontrakan')
            .delete()
            .eq('id', id);
        if (error) throw error
        return data
    }
}