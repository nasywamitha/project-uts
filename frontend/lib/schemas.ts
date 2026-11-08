import { z } from 'zod';

// Skema Zod bersama untuk Tambah Kategori Keuangan
export const categorySchema = z.object({
  name: z
    .string()
    .min(3, 'Nama kategori minimal 3 karakter')
    .max(30, 'Nama kategori maksimal 30 karakter'),
  type: z.enum(['INCOME', 'EXPENSE'], {
    message: 'Pilih tipe kategori yang valid',
  }),
});

export type CategoryFormData = z.infer<typeof categorySchema>;