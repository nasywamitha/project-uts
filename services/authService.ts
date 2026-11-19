import { api } from '@/lib/axios';

// Fungsi Login
export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Fungsi Register (Mendukung nama, email, whatsapp, password, role)
export const registerUser = async (userData: {
  nama: string;
  email: string;
  whatsapp: string;
  password: string;
  role?: string;
}) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// 1. Mengambil data profil admin dari backend
export const getAdminProfile = async () => {
  const response = await api.get('/settings/profile');
  return response.data;
};

// 2. Memperbarui profil admin (nama, jabatan, phone)
export const updateAdminProfile = async (data: { name?: string; jabatan?: string; phone?: string }) => {
  const response = await api.put('/settings/profile', data);
  return response.data;
};

// 3. Mengubah kata sandi admin
export const updateAdminPassword = async (data: { oldPassword: string; newPassword: string }) => {
  const response = await api.put('/settings/password', data);
  return response.data;
};

// 4. Mengambil daftar role & akses (khusus admin)
export const getRolesAndAccess = async () => {
  const response = await api.get('/settings/roles');
  return response.data;
};