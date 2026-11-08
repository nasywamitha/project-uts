'use client';

import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/services/dashboardService';

export function useDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Gagal memuat data dashboard');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { stats, loading, error };
}