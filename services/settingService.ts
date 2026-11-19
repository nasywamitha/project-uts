// src/services/settingsService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'; // Sesuaikan port backend Anda

export const settingsService = {
  getProfile: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/settings/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Gagal mengambil data profil');
    return response.json();
  },

  updateProfile: async (data: { name: string; jabatan: string; phone: string }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/settings/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Gagal memperbarui profil');
    return response.json();
  },

  updatePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/settings/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Gagal memperbarui password');
    return response.json();
  },

  terminateSession: async (id: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/settings/session/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Gagal mengakhiri sesi');
    return result;
  },

  logoutAll: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/settings/logout-all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Gagal melakukan logout');
    return result;
  },
};