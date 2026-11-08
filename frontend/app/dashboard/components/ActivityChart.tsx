'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ActivityChart({ data }: { data: any[] }) {
  return (
    <div className="xl:col-span-2 min-w-0 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-gray-800">Aktivitas Pengguna</h3>
          <p className="text-xs text-gray-400">Jumlah pengguna aktif per bulan</p>
        </div>
        <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2.5 py-1 rounded-full">● Tahun 2026</span>
      </div>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
  );
}