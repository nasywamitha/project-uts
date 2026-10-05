'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { 
  Calendar, Download, MoreVertical, SlidersHorizontal, Receipt, PieChart as PieChartIcon, Wallet, PiggyBank, Bot, TrendingUp 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function FeatureUsagePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/feature-usage')
      .then((res) => res.json())
      .then((resData) => setData(resData.data));
  }, []);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'receipt': return <Receipt className="w-4 h-4" />;
      case 'pie-chart': return <PieChartIcon className="w-4 h-4" />;
      case 'wallet': return <Wallet className="w-4 h-4" />;
      case 'piggy': return <PiggyBank className="w-4 h-4" />;
      case 'bot': return <Bot className="w-4 h-4" />;
      default: return <Receipt className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 bg-white">
        <Header />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Statistik Penggunaan Fitur</h1>
            <p className="text-xs text-gray-400 mt-1">Lihat seberapa sering fitur aplikasi digunakan oleh pengguna.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50">
              <Calendar className="w-4 h-4 text-amber-500" /> 1 Sep 2026 - 30 Sep 2026
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50">
              <Download className="w-4 h-4" /> Ekspor
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <div className="min-w-0 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Jumlah Penggunaan Fitur</h3>
              <p className="text-xs text-gray-400 mt-0.5">Frekuensi eksekusi fitur inti per 30 hari</p>
              <div className="h-64 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.barChart} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                      {data?.barChart.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-xs">
              <p className="text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
                Fitur pencatatan menyumbang volume interaksi harian terbesar (+28%)
              </p>
              <button className="text-amber-600 font-bold hover:underline">Lihat Rincian Harian</button>
            </div>
          </div>

          <div className="min-w-0 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Persentase Penggunaan Fitur</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Proporsi total aktivitas tercatat</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4" /></button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center my-4">
                <div className="h-48 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={data?.pieChart} innerRadius={55} outerRadius={75} paddingAngle={3} dataKey="percentage">
                        {data?.pieChart.map((entry: any, index: number) => (
                          <Cell key={`cell-pie-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute text-center">
                    <p className="text-xl font-extrabold text-gray-800 leading-tight">8.430</p>
                    <p className="text-[10px] text-gray-400 font-medium">Total Aktivitas</p>
                  </div>
                </div>
                <div className="space-y-2 sm:pl-2">
                  {data?.pieChart.map((item: any) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="text-gray-600 font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-gray-800">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Badge Kategori Sehat di tengah dengan latar belakang ungu muda */}
            <div className="bg-gray-50 rounded-xl p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs border border-gray-100">
              <span className="text-gray-500 font-medium">Diversifikasi Fitur</span>
              <span className="text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-lg">Kategori Sehat (6 modul aktif)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Rincian Pertumbuhan Fitur (Month over Month)</h3>
              <p className="text-xs text-gray-400 mt-0.5">Tingkat retensi, jam puncak operasional, dan pertumbuhan performa fitur</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter Status
            </button>
          </div>

          <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-[11px] text-gray-400 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="p-3 pl-4">NAMA FITUR</th>
                <th className="p-3">PENGGUNAAN (BLN INI)</th>
                <th className="p-3">PERTUMBUHAN MOM</th>
                <th className="p-3">TINGKAT RETENSI</th>
                <th className="p-3">JAM PUNCAK AKSES</th>
                <th className="p-3 text-center pr-4">STATUS KINERJA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data?.details.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50/60">
                  <td className="p-4 pl-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                        {renderIcon(item.iconType)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-xs">{item.name}</p>
                        <p className="text-[11px] text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-gray-800">{item.usage}</td>
                  <td className="p-4 font-bold text-emerald-600">
                    <span className="flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" />{item.growth}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${item.barColor}`} style={{ width: `${item.retention}%` }}></div>
                      </div>
                      <span className="font-bold text-gray-700">{item.retention}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 font-medium">{item.peakHour}</td>
                  <td className="p-4 text-center pr-4">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold inline-block ${item.statusBg}`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </main>
    </div>
  );
}