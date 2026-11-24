'use server';

import { cookies } from 'next/headers';

export type ActionState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    type?: string[];
  };
};

export async function createCategoryAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const name = formData.get('name');
  const type = formData.get('type');
  const icon = formData.get('icon');

  // 1. Ambil cookie token dari browser pengguna
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value; // Sesuaikan nama cookie token Anda jika berbeda (misal: 'access_token', 'session', dll)

  try {
    // 2. Kirim ke backend Express dengan menyertakan Header Authorization
    const res = await fetch('http://localhost:5001/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Sertakan token di sini
      },
      body: JSON.stringify({ name, type, icon }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Gagal menambahkan kategori.',
      };
    }

    return {
      success: true,
      message: 'Kategori berhasil ditambahkan!',
    };
  } catch (error) {
    console.error('Error server action:', error);
    return {
      success: false,
      message: 'Terjadi kesalahan pada koneksi server.',
    };
  }
}