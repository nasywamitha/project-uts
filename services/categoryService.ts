import { api } from '@/lib/axios';

// Contoh fungsi untuk menambah kategori baru ke backend Express
export const createCategory = async (categoryData: { name: string; type: string; icon: string }) => {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Gagal menambahkan kategori');
  }
  return data;
};

// Mengambil kategori berdasarkan tipe (Pengeluaran / Pemasukan)
export const getCategoriesByType = async (type: string) => {
  const response = await api.get(`/categories?type=${type}`);
  return response.data;
};

// Menghapus kategori berdasarkan ID
export const deleteCategoryById = async (id: string) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};