const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const getAuthHeaders = (): HeadersInit => {
  const rawToken =
    typeof window !== 'undefined'
      ? localStorage.getItem('token') ||
        localStorage.getItem('accessToken') ||
        localStorage.getItem('authToken')
      : null;

  const token = rawToken?.replace(/^"|"$/g, '').replace(/^Bearer\s+/i, '').trim();

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const featureService = {
  getUsageStats: async () => {
    const res = await fetch(`${API_URL}/feature-usage`, {
      cache: 'no-store',
      headers: getAuthHeaders(),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(
        json?.message || `Gagal memuat data statistik fitur (HTTP ${res.status})`
      );
    }

    return json.data;
  },
};