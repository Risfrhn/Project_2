export const ActService = {
    async tambahAktivitas(payload: any) {
        const response = await fetch('/api/aktivitas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to tambah aktivitas');
        }
        return response.json();
    },

    async getAktivitas() {
        const response = await fetch('/api/aktivitas');
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to get aktivitas');
        }
        return response.json();
    },

    async getAktivitasById(id: string) {
        const response = await fetch(`/api/aktivitas/${id}`);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to get aktivitas by id');
        }
        return response.json();
    }
}
