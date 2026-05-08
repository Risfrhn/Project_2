export const UnitService = {
    async tambahUnit(payload: any) {
        const response = await fetch('/api/unit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to tambah unit');
        }
        return response.json();
    },

    async getAllUnit() {
        const response = await fetch('/api/unit');
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to get all unit');
        }
        return response.json();
    },


    async hapusUnit(id: string) {
        const response = await fetch(`/api/unit/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to hapus unit');
        }
        return response.json();
    },

    async updateUnit(id: string, payload: any) {
        const response = await fetch(`/api/unit/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to update unit');
        }
        return response.json();
    },

    async getUnitById(id: string) {
        const response = await fetch(`/api/unit/${id}`);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to get unit by id');
        }
        return response.json();
    },

    async cekPembayaran(id: string) {
        const response = await fetch(`/api/unit/${id}/cek-pembayaran`);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to cek pembayaran');
        }
        return response.json();
    },


    // PEMBAYARAN KONTRAKAN
    async tambahPembayaran(payload: any) {
        // payload is FormData
        const response = await fetch('/api/pembayaran', {
            method: 'POST',
            body: payload
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to tambah pembayaran');
        }
        return response.json();
    },

    async getPembayaranByIdKontrakan(id: string) {
        const response = await fetch(`/api/pembayaran/${id}`); // id refers to id_kontrakan
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to get pembayaran by id kontrakan');
        }
        return response.json();
    },

    async getPembayaranTerbaru(id: string) {
        const response = await fetch(`/api/pembayaran/terbaru?id_kontrakan=${id}`);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to get pembayaran terbaru');
        }
        return response.json();
    },

    async hitungBulan(id: string) {
        const response = await fetch(`/api/pembayaran/hitung-bulan?id_kontrakan=${id}`);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to hitung bulan');
        }
        return response.json();
    },

    async hitungTotalBayarById(id: string) {
        const response = await fetch(`/api/pembayaran/total?id_kontrakan=${id}`);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to hitung total bayar');
        }
        return response.json();
    },

    async hapusDataPembayaran(id: string) {
        const response = await fetch(`/api/pembayaran/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to hapus data pembayaran');
        }
        return response.json();
    },


    // Tagihan Air

    async tambahTagihanAir(payload: any) {
        // payload is FormData
        const response = await fetch('/api/tagihan-air', {
            method: 'POST',
            body: payload
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to tambah tagihan air');
        }
        return response.json();
    },

    async getAllTagihanByIdKontrakan(id: string) {
        const response = await fetch(`/api/tagihan-air?id_kontrakan=${id}`);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to get all tagihan air');
        }
        return response.json();
    },

    async deleteTagihanAir(id: string) {
        const response = await fetch(`/api/tagihan-air/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to delete tagihan air');
        }
        return response.json();
    },

    async hitungTotalMeteran(id: string) {
        const response = await fetch(`/api/tagihan-air/total-meteran?id_kontrakan=${id}`);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to hitung total meteran');
        }
        return response.json();
    },

    async hitungTotalTagihan(id: string) {
        const response = await fetch(`/api/tagihan-air/total-tagihan?id_kontrakan=${id}`);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to hitung total tagihan');
        }
        return response.json();
    },

}