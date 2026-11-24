import { UsersResponse } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const getAuthHeaders = (): HeadersInit => {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token') ||
        localStorage.getItem('accessToken') ||
        localStorage.getItem('authToken')
      : null;

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const userService = {
  getAllUsers: async (): Promise<UsersResponse> => {
    const res = await fetch(`${API_URL}/users/web`, {
      cache: 'no-store',
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Gagal mengambil data pengguna dari server (HTTP ${res.status})`);
    }

    return res.json();
  },
};