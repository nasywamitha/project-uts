'use client';

import { useState } from 'react';
import { MoreVertical, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LabelList } from 'recharts';

export default function UsageCharts({ data }: { data: any }) {
  const [activeFilter, setActiveFilter] = useState<'Bulan Ini' | 'Pekan Ini'>('Bulan Ini');

  const hasBarData = Array.isArray(data?.barChart) && data.barChart.length > 0;
  const hasPieData = Array.isArray(data?.pieChart) && data.pieChart.length > 0;
  const totalActivities = data?.totalActivities ?? 0;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
      
      {/* Grafik Batang */}
      <div className="min-w-0 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Jumlah Penggunaan Fitur</h3>
              <p className="text-xs text-gray-400 mt-0.5">Frekuensi eksekusi fitur inti per 30 hari</p>
            </div>
            {/* Tombol Toggle Bulan Ini / Pekan Ini */}
            <div className="bg-gray-100 p-1 rounded-xl flex items-center text-xs font-semibold">
              <button 
                onClick={() => setActiveFilter('Bulan Ini')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${activeFilter === 'Bulan Ini' ? 'bg-white text-gray-800 shadow-xs' : 'text-gray-400'}`}
              >
                Bulan Ini
              </button>
              <button 
                onClick={() => setActiveFilter('Pekan Ini')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${activeFilter === 'Pekan Ini' ? 'bg-white text-gray-800 shadow-xs' : 'text-gray-400'}`}
              >
                Pekan Ini
              </button>
            </div>
          </div>

          <div className="h-64 w-full mt-4">
            {hasBarData ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.barChart} margin={{ top: 25, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                    <LabelList dataKey="count" position="top" style={{ fontSize: '11px', fontWeight: 'bold', fill: '#374151' }} />
                    {data.barChart.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50/70 rounded-xl border border-dashed border-gray-200 text-gray-400">
                <BarChart3 className="w-6 h-6 mb-1.5 text-gray-300" />
                <p className="text-xs">Belum ada data penggunaan fitur.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-xs">
          <p className="text-gray-500 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full inline-block ${hasBarData ? 'bg-amber-500' : 'bg-gray-300'}`}></span>
            {hasBarData
              ? (data?.topFeatureNote || 'Statistik interaksi fitur tercatat.')
              : 'Belum ada aktivitas fitur yang dimulai.'}
          </p>
          <button className="text-amber-600 font-bold hover:underline cursor-pointer">Lihat Rincian Harian</button>
        </div>
      </div>

      {/* Grafik Lingkaran (Pie Chart) */}
      <div className="min-w-0 bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">Persentase Penggunaan Fitur</h3>
              <p className="text-xs text-gray-400 mt-0.5">Proporsi total aktivitas tercatat</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 cursor-pointer"><MoreVertical className="w-4 h-4" /></button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 items-center my-4">
            <div className="h-48 relative flex items-center justify-center">
              {hasPieData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.pieChart} innerRadius={55} outerRadius={75} paddingAngle={3} dataKey="percentage">
                      {data.pieChart.map((entry: any, index: number) => (
                        <Cell key={`cell-pie-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-36 h-36 rounded-full border-12 border-gray-100" />
              )}
              <div className="absolute text-center">
                <p className="text-xl font-extrabold text-gray-800 leading-tight">
                  {totalActivities.toLocaleString('id-ID')}
                </p>
                <p className="text-[10px] text-gray-400 font-medium">Total Aktivitas</p>
              </div>
            </div>

            <div className="space-y-1.5 sm:pl-2">
              {hasPieData ? (
                data.pieChart.map((item: any) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                      <span className="text-gray-600 font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-gray-800">{item.percentage}%</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 text-center sm:text-left">
                  Belum ada proporsi fitur untuk ditampilkan.
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs border border-gray-100">
          <span className="text-gray-500 font-medium">Diversifikasi Fitur</span>
          {hasPieData ? (
            <span className="text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-lg">
              Kategori Sehat ({data.pieChart.length} modul aktif)
            </span>
          ) : (
            <span className="text-gray-500 font-semibold bg-gray-200/70 px-2.5 py-1 rounded-lg">
              0 modul aktif
            </span>
          )}
        </div>
      </div>

    </div>
  );
}