'use client';

import { Laptop, Smartphone, LogOut, Lock } from 'lucide-react';

export default function SessionLogoutTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-800 text-sm mb-4">Perangkat Aktif</h3>
        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-gray-50 rounded-xl border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Laptop className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-bold text-gray-800">MacBook Pro 16" <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded ml-1">Sesi Ini</span></p>
                <p className="text-gray-400">macOS • Chrome • IP 182.253.112.44</p>
              </div>
            </div>
          </div>
          <div className="p-3.5 bg-gray-50 rounded-xl border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-bold text-gray-800">iPhone 15 Pro</p>
                <p className="text-gray-400">iOS 17.5 • Terakhir aktif 12 mnt lalu</p>
              </div>
            </div>
            <button className="px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-bold">Akhiri</button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-2">Keluar Konsol</h3>
          <p className="text-xs text-gray-400 mb-4">Akhiri sesi kerja dan hapus token otentikasi aktif.</p>
        </div>
        <div className="space-y-2">
          <button className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"><LogOut className="w-4 h-4" /> Logout Sekarang</button>
          <button className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"><Lock className="w-4 h-4" /> Kunci Layar</button>
        </div>
      </div>
    </div>
  );
}