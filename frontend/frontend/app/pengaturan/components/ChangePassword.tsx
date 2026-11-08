'use client';

import { useState } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function ChangePasswordTab() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-800 text-sm mb-4">Ubah Password</h3>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Password Saat Ini</label>
            <div className="relative">
              <input type={showCurrent ? 'text' : 'password'} defaultValue="SuperPass2023!#Admin" className="w-full p-2.5 bg-gray-50 border rounded-xl font-mono" />
              <button onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-3 text-gray-400">{showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
            </div>
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Password Baru</label>
            <div className="relative">
              <input type={showNew ? 'text' : 'password'} defaultValue="UKU#AdminSecure2024!" className="w-full p-2.5 bg-gray-50 border rounded-xl font-mono" />
              <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-3 text-gray-400">{showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl border grid grid-cols-2 gap-2 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium"><CheckCircle className="w-3.5 h-3.5" /> Min. 8 Karakter</span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium"><CheckCircle className="w-3.5 h-3.5" /> Huruf Besar & Kecil</span>
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">Konfirmasi Password Baru</label>
            <div className="relative">
              <input type={showConfirm ? 'text' : 'password'} defaultValue="UKU#AdminSecure2024!" className="w-full p-2.5 bg-gray-50 border rounded-xl font-mono" />
              <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-gray-400">{showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl mt-2">Perbarui Password →</button>
        </div>
      </div>
      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-800 text-sm mb-4">Riwayat Pembaruan</h3>
        <div className="p-3 bg-gray-50 rounded-xl border text-xs">
          <p className="font-bold text-gray-800">14 Mei 2024 • 08:30 WIB</p>
          <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold mt-1 inline-block">Berhasil</span>
        </div>
      </div>
    </div>
  );
}