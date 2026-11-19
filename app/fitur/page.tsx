'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
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
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 bg-white">
        <Header />

        {/* Header Halaman */}
        <UsageHeader />

        {/* Grafik Statistik (Bar & Pie Chart) */}
        <UsageCharts data={data} />

        {/* Tabel Rincian Pertumbuhan Fitur */}
        <UsageTable details={data?.details} />
      </main>
    </div>
  );
}