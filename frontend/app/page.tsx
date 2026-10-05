'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { 
  Calendar, Download, TrendingUp, Users, UserCheck, UserPlus, Activity, MoreVertical 
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const dashboardData = {
  stats: {
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

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <main className="flex-1 p-8 bg-white">
        <Header />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50">
              <Calendar className="w-4 h-4 text-amber-500" /> Bulan Ini (Sep 2026)
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-semibold hover:bg-amber-600">
              <Download className="w-4 h-4" /> Unduh Laporan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard title="TOTAL PENGGUNA" value={dashboardData.stats.totalPengguna} growth={dashboardData.stats.totalPenggunaGrowth} icon={Users} color="bg-amber-100 text-amber-600" />
          <StatCard title="PENGGUNA AKTIF" value={dashboardData.stats.penggunaAktif} growth={dashboardData.stats.penggunaAktifGrowth} icon={UserCheck} color="bg-emerald-100 text-emerald-600" />
          <StatCard title="PENGGUNA BARU" value={dashboardData.stats.penggunaBaru} growth={dashboardData.stats.penggunaBaruGrowth} icon={UserPlus} color="bg-sky-100 text-sky-600" />
          <StatCard title="TOTAL AKTIVITAS" value={dashboardData.stats.totalAktivitas} growth={dashboardData.stats.totalAktivitasGrowth} icon={Activity} color="bg-purple-100 text-purple-600" />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-gray-800">Aktivitas Pengguna</h3>
                <p className="text-xs text-gray-400">Jumlah pengguna aktif per bulan</p>
              </div>
              <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-full">● Tahun 2026</span>
            </div>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardData.chartAktivitas}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <h3 className="font-bold text-gray-800">Penggunaan Fitur</h3>
            <p className="text-xs text-gray-400 mb-4">Fitur yang paling sering digunakan</p>
            <div className="space-y-3">
              {dashboardData.penggunaanFitur.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                      {item.name}
                    </span>
                    <span className="text-gray-800 font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-gray-800">Pengguna Terbaru</h3>
              <p className="text-xs text-gray-400">Akun yang baru terdaftar dalam 7 hari terakhir</p>
            </div>
            <button className="text-xs font-bold text-amber-600 hover:underline">Lihat Semua →</button>
          </div>
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs text-gray-400 uppercase font-semibold">
              <tr>
                <th className="p-3 rounded-l-xl">Nama</th>
                <th className="p-3">Email</th>
                <th className="p-3">Tanggal Daftar</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right rounded-r-xl">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dashboardData.recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/60">
                  <td className="p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">{user.initials}</div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-400">ID: {user.id}</p>
                    </div>
                  </td>
                  <td className="p-3 text-gray-500">{user.email}</td>
                  <td className="p-3 text-gray-500">{user.date}</td>
                  <td className="p-3"><span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-medium">● {user.status}</span></td>
                  <td className="p-3 text-right space-x-2">
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700">Detail</button>
                    <button className="p-1 text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4 inline" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, growth, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-start">
      <div>
        <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{value}</h2>
        <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> {growth} <span className="text-gray-400 font-normal">dari bulan lalu</span>
        </span>
      </div>
      <div className={`p-2.5 rounded-xl ${color}`}><Icon className="w-5 h-5" /></div>
    </div>
  );
}