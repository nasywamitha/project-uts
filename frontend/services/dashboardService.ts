export const dashboardService = {
  getDashboardData: async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Gagal mengambil data dashboard');
    return res.json();
  },
};