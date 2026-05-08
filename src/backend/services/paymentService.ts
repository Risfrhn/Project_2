export const PaymentService = {
    async tambahPembayaran(payload: any) {
        const response = await fetch('/api/pembayaran-simple', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to tambah pembayaran');
        }
        return response.json();
    },

    async webhookPayment(payload: any) {
        const response = await fetch('/api/webhook-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to webhook payment');
        }
        return response.json();
    }
}