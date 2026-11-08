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