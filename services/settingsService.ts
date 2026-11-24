// src/services/settingsService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export interface AdminAccessItem {
  id: number | string;
  name: string;
  email: string;
  jabatan: string | null;
  role: string;
}

export interface ActiveSessionItem {
  id: number | string;
  device: string;
  location?: string;
  status?: string;
  lastActive?: string;
  isCurrent?: boolean;
}

const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token') || localStorage.getItem('accessToken');
};

const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const settingsService = {
  getProfile: async () => {
    const response = await fetch(`${API_URL}/settings/profile`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || 'Gagal mengambil data profil');
    }
    return result;
  },

  updateProfile: async (data: { name: string; jabatan: string; phone: string }) => {
    const response = await fetch(`${API_URL}/settings/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || 'Gagal memperbarui profil');
    }
    return result;
  },

  updatePassword: async (data: { oldPassword: string; newPassword: string }) => {
    const response = await fetch(`${API_URL}/settings/password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || 'Gagal mengubah password');
    }
    return result;
  },

  getAdmins: async (): Promise<AdminAccessItem[]> => {
    const response = await fetch(`${API_URL}/settings/admins`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || 'Gagal memuat data admin');
    }

    const rawList = Array.isArray(result)
      ? result
      : Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result?.admins)
          ? result.admins
          : Array.isArray(result?.data?.admins)
            ? result.data.admins
            : [];

    return rawList.map((item: any) => ({
      id: item.id,
      name: item.name || item.nama || '',
      email: item.email || '',
      jabatan: item.jabatan ?? null,
      role: item.role || 'Admin',
    }));
  },

  updateAdminJabatan: async (id: number | string, data: { jabatan: string }) => {
    const response = await fetch(`${API_URL}/settings/admins/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ ...data, role: 'Admin' }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || 'Gagal memperbarui jabatan admin');
    }
    return result;
  },

  createAdmin: async (data: {
    name: string;
    email: string;
    password: string;
    jabatan: string;
  }) => {
    const response = await fetch(`${API_URL}/settings/admins`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ ...data, role: 'Admin' }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || 'Gagal menambahkan admin baru');
    }
    return result;
  },

  getSessions: async (): Promise<ActiveSessionItem[]> => {
    const response = await fetch(`${API_URL}/settings/sessions`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || 'Gagal memuat perangkat aktif');
    }
    return Array.isArray(result) ? result : result.data || [];
  },

  terminateSession: async (id: number | string) => {
    const response = await fetch(`${API_URL}/settings/session/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || 'Gagal mengakhiri sesi');
    }
    return result;
  },

  logoutAll: async () => {
    const response = await fetch(`${API_URL}/settings/logout-all`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.message || 'Gagal melakukan logout');
    }
    return result;
  },
};