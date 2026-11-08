'use server';

import { categorySchema } from '@/lib/schemas';
import { cookies } from 'next/headers';

export type ActionState = {
  success: boolean;
  message?: string;
  errors?: {
    name?: string[];
    type?: string[];
  };
  data?: any;
};

export async function createCategoryAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // 1. Cek Autentikasi dari Cookie
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return {
      success: false,
      message: 'Akses ditolak. Anda harus login terlebih dahulu.',
    };
  }

  // 2. Ambil data dari Form
  const rawData = {
    name: formData.get('name'),
    type: formData.get('type'),
    icon: formData.get('icon') || 'utensils', // Default icon jika belum dipilih
  };

  // 3. Validasi Zod
  const validatedFields = categorySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validasi gagal. Periksa kembali input Anda.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 4. Kirim Data ke Backend Express (MySQL)
  try {
    const response = await fetch('http://localhost:5000/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(validatedFields.data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Gagal menyimpan kategori ke database.',
      };
    }

    return {
      success: true,
      message: 'Kategori berhasil ditambahkan!',
      data: result.data,
    };
  } catch (error) {
    console.error('Error create category:', error);
    return {
      success: false,
      message: 'Terjadi kesalahan koneksi ke server backend.',
    };
  }
}