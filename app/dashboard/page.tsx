'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Calendar, Download, BarChart3 } from 'lucide-react';
import { useDashboard } from '@/hooks/useDashboard';
import DashboardStats from './components/DashboardStats';
import RecentUsersTable from './components/RecentUsersTable';

export default function DashboardPage() {
  const { stats, features = [], recentUsers, isLoading } = useDashboard();

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 bg-white">
        <Header />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 text-gray-600 font-semibold text-xs rounded-xl hover:bg-gray-100 transition">
              <Calendar className="w-4 h-4 text-gray-400" /> Bulan Ini (Sep 2026)
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white font-semibold text-xs rounded-xl hover:bg-amber-600 transition">
              <Download className="w-4 h-4" /> Unduh Laporan
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <DashboardStats stats={stats} />

        {/* Charts & Feature Usage Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Grafik Aktivitas Pengguna */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-sm font-bold text-gray-800">Aktivitas Pengguna</h3>
                <p className="text-[11px] text-gray-400">Jumlah pengguna aktif per bulan</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-600 rounded-lg">
                Tahun 2026
              </span>
            </div>
            <div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400 gap-2">
              <BarChart3 className="w-8 h-8 text-gray-300" />
              <span>Belum ada data aktivitas pengguna.</span>
            </div>
          </div>

          {/* Penggunaan Fitur */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Penggunaan Fitur</h3>
              <p className="text-[11px] text-gray-400 mb-4">Fitur yang paling sering digunakan</p>
            </div>
            
            {(!features || features.length === 0) ? (
              <div className="h-48 flex flex-col items-center justify-center text-xs text-gray-400 text-center p-4">
                <p>Belum ada data penggunaan fitur.</p>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {features.map((feat: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between font-semibold mb-1 text-gray-700">
                      <span>{feat.name}</span>
                      <span>{feat.val}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className={`${feat.color} h-full rounded-full`} style={{ width: feat.val }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div /> {/* Spacer */}
          </div>
        </div>

        {/* Recent Users Table Component */}
        <RecentUsersTable users={recentUsers} />
      </main>
    </div>
  );
}