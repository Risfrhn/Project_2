export const AuthService = {
    async login(payload: any) {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to login');
        }
        return response.json();
    },

    async logout() {
        const response = await fetch('/api/auth/logout', {
            method: 'POST'
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to logout');
        }
        return response.json();
    },

    async register(payload: any) {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to register');
        }
        return response.json();
    },

    async getAllUser() {
        const response = await fetch('/api/users');
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Failed to get all user');
        }
        return response.json();
    }
}
