import { UsersResponse } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const userService = {
  getAllUsers: async (): Promise<UsersResponse> => {
    const res = await fetch(`${API_URL}/users`, { 
      cache: 'no-store' 
    });

    if (!res.ok) {
      throw new Error('Gagal mengambil data pengguna dari server');
    }

    return res.json();
  },
};