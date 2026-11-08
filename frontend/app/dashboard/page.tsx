'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Calendar, Download, Users, UserCheck, UserPlus, Activity } from 'lucide-react';

import StatCard from './components/StatCard';
import ActivityChart from './components/ActivityChart';
import FeatureUsage from './components/FeatureUsage';
import RecentUsersTable from './components/RecentUsersTable';
import { useDashboard } from '@/hooks/useDashboard'; // 👈 Panggil custom hook yang sudah kita buat

export default function DashboardPage() {
  // Panggil data asli dari backend melalui hook
  // Jika backend belum siap/loading, kita bisa berikan nilai cadangan (fallback) berupa dummy data Anda
  const { stats, loading } = useDashboard();

  // Data fallback (jika backend belum merespons, gunakan data statis Anda sebelumnya)
  const dashboardData = {
    stats: stats || {
      totalPengguna: 1250, totalPenggunaGrowth: '+12%',
      penggunaAktif: 980, penggunaAktifGrowth: '+8%',
      penggunaBaru: 35, penggunaBaruGrowth: '+20%',
      totalAktivitas: 8430, totalAktivitasGrowth: '+15%',
    },
    chartAktivitas: [
      { month: 'Jan', value: 200 }, { month: 'Feb', value: 300 }, { month: 'Mar', value: 420 },
      { month: 'Apr', value: 400 }, { month: 'Mei', value: 550 }, { month: 'Jun', value: 500 },
      { month: 'Jul', value: 620 }, { month: 'Agu', value: 580 }, { month: 'Sep', value: 720 },
      { month: 'Okt', value: 890 }, { month: 'Nov', value: 1000 }, { month: 'Des', value: 970 },
    ],
    penggunaanFitur: [
      { name: 'Catat Pengeluaran', percentage: 28, color: '#f59e0b' },
      { name: 'Budget', percentage: 20, color: '#3b82f6' },
      { name: 'Rekap Aktivitas', percentage: 18, color: '#6366f1' },
      { name: 'Nabung', percentage: 15, color: '#60a5fa' },
      { name: 'AI Notifikasi', percentage: 12, color: '#a855f7' },
      { name: 'Lainnya', percentage: 7, color: '#9ca3af' },
    ],
    recentUsers: [
      { id: 'USR-8831', initials: 'SR', name: 'Siti Rahma', email: 'siti@email.com', date: '20 Sep 2026', status: 'Aktif' },
      { id: 'USR-8830', initials: 'BS', name: 'Budi Santoso', email: 'budi@email.com', date: '19 Sep 2026', status: 'Aktif' },
      { id: 'USR-8829', initials: 'DL', name: 'Dewi Lestari', email: 'dewi@email.com', date: '18 Sep 2026', status: 'Aktif' },
      { id: 'USR-8828', initials: 'AD', name: 'Anisa Dwi Ariyanti', email: 'anisa.dwi@example.com', date: '17 Sep 2026', status: 'Aktif' },
    ],
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 bg-white">
        <Header />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50">
              <Calendar className="w-4 h-4 text-amber-500" /> Bulan Ini (Sep 2026)
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-semibold hover:bg-amber-600">
              <Download className="w-4 h-4" /> Unduh Laporan
            </button>
          </div>
        </div>

        {/* 4 Kartu Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <StatCard title="TOTAL PENGGUNA" value={dashboardData.stats.totalPengguna} growth={dashboardData.stats.totalPenggunaGrowth} icon={Users} color="bg-amber-100 text-amber-600" />
          <StatCard title="PENGGUNA AKTIF" value={dashboardData.stats.penggunaAktif} growth={dashboardData.stats.penggunaAktifGrowth} icon={UserCheck} color="bg-emerald-100 text-emerald-600" />
          <StatCard title="PENGGUNA BARU" value={dashboardData.stats.penggunaBaru} growth={dashboardData.stats.penggunaBaruGrowth} icon={UserPlus} color="bg-sky-100 text-sky-600" />
          <StatCard title="TOTAL AKTIVITAS" value={dashboardData.stats.totalAktivitas} growth={dashboardData.stats.totalAktivitasGrowth} icon={Activity} color="bg-purple-100 text-purple-600" />
        </div>

        {/* Grafik & Fitur */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <ActivityChart data={dashboardData.chartAktivitas} />
          <FeatureUsage features={dashboardData.penggunaanFitur} />
        </div>

        {/* Tabel Pengguna Terbaru */}
        <RecentUsersTable users={dashboardData.recentUsers} />
      </main>
    </div>
  );
}