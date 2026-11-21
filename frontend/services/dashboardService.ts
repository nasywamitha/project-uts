const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const dashboardService = {
  getDashboardData: async () => {
    const res = await fetch(`${API_URL}/dashboard`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal mengambil data dashboard');
    return res.json();
  },
};