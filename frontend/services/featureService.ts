const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const featureService = {
  getUsageStats: async () => {
    const res = await fetch(`${API_URL}/feature-usage`, { cache: 'no-store' });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memuat data statistik fitur');
    return json.data;
  }
};