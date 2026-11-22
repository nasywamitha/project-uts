'use client';

import { useState, useEffect } from 'react';
import { featureService } from '@/services/featureService';

// Import Komponen Terpisah yang ada di folder components/
import UsageHeader from './components/UsageHeader';
import UsageCharts from './components/UsageCharts';
import UsageTable from './components/UsageTable';

export default function FeatureUsagePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    featureService.getUsageStats()
      .then((resData) => {
        setData(resData);
      })
      .catch((err) => console.error('Gagal memuat data statistik fitur:', err));
  }, []);

  return (
    <>
      {/* Header Halaman */}
      <UsageHeader />

      {/* Grafik Statistik (Bar & Pie Chart) */}
      <UsageCharts data={data} />

      {/* Tabel Rincian Pertumbuhan Fitur */}
      <UsageTable details={data?.details} />
    </>
  );
}