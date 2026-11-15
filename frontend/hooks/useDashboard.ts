import { useState, useEffect } from 'react';
import { dashboardService } from '@/services/dashboardService';

export function useDashboard() {
  const [data, setData] = useState<any>({
    stats: { totalPengguna: 0, penggunaAktif: 0, penggunaBaru: 0, totalAktivitas: 0 },
    chart: [],
    features: [],       // Kosong secara default
    recentUsers: [],    // Kosong secara default
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dashboardService.getDashboardData()
      .then((res) => {
        if (res) setData(res);
      })
      .catch((err) => {
        console.error('Error fetching dashboard:', err);
        // Fallback jika backend belum siap / kosong
        setData({
          stats: { totalPengguna: 0, penggunaAktif: 0, penggunaBaru: 0, totalAktivitas: 0 },
          chart: [],
          features: [],
          recentUsers: [],
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { ...data, isLoading };
}