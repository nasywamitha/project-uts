import { api } from '@/lib/axios';

export const getDashboardStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response.data;
};

export const getRecentUsers = async () => {
  const response = await api.get('/dashboard/recent-users');
  return response.data;
};