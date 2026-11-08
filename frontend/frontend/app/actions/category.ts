'use server';

import { categorySchema } from '@/components/lib/schemas';
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
  // 1. Cek Autentikasi (Proteksi Server Action)
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return {
      success: false,
      message: 'Akses ditolak. Anda harus login terlebih dahulu.',
    };
  }

  // 2. Ambil data dari FormData
  const rawData = {
    name: formData.get('name'),
    type: formData.get('type'),
  };

  // 3. Validasi menggunakan Zod dengan safeParse (Error per Field)
  const validatedFields = categorySchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validasi gagal. Periksa kembali input Anda.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 4. Simpan ke database / backend
  try {
    return {
      success: true,
      message: 'Kategori berhasil ditambahkan!',
      data: validatedFields.data,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Terjadi kesalahan pada server.',
    };
  }
}