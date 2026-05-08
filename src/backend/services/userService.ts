export const UserService = {
    async getAllUser() {
        const response = await fetch('/api/users');
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to get all user');
        }
        return response.json();
    },

    async getDataUserLogin() {
        const response = await fetch('/api/users/me');
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to get data user login');
        }
        return response.json();
    },

    async getDataUserById(id: string) {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to get data user by id');
        }
        return response.json();
    },


    async hapusDataUser(id: string) {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to hapus data user');
        }
        return response.json();
    },

    async updatePasswordUser(id: string, password: string) {
        const response = await fetch(`/api/users/${id}/password`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to update password');
        }
        return response.json();
    }
}