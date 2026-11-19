import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Sesuaikan URL backend Anda
});

// Interceptor untuk menyisipkan token secara otomatis ke setiap request
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});