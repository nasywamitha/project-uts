import { api } from '@/lib/axios';

// Fungsi untuk menambah kategori baru
export const createCategory = async (categoryData: { name: string; type: string; icon: string }) => {
  const response = await api.post('/categories', categoryData);
  return response.data;
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