'use client';

import { Camera, Trash2, Save } from 'lucide-react';

export default function AdminProfileTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-3 relative">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300" alt="Admin" className="w-full h-full object-cover" />
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
        </div>
        <h2 className="text-base font-bold text-gray-800">Budi Pratama</h2>
        <p className="text-xs text-gray-400 mb-4">Head of Finance Ops</p>
        
        <div className="w-full bg-gray-50 rounded-xl p-3 text-xs space-y-2 mb-4 border border-gray-100 text-left">
          <div className="flex justify-between"><span className="text-gray-400">ID:</span> <span className="font-mono font-semibold">EMP-9921-JKT</span></div>
          <div className="flex justify-between"><span className="text-gray-400">STATUS:</span> <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded font-bold text-[10px]">Aktif</span></div>
        </div>

        <div className="flex gap-2 w-full">
          <button className="flex-1 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"><Camera className="w-3.5 h-3.5" /> Ganti Foto</button>
          <button className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl"><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-4">Informasi Data Pribadi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div><label className="block text-gray-600 font-bold mb-1">Nama Lengkap</label><input type="text" defaultValue="Budi Pratama" className="w-full p-2.5 bg-gray-50 border rounded-xl" /></div>
            <div><label className="block text-gray-600 font-bold mb-1">Jabatan</label><input type="text" defaultValue="Head of Finance Ops" className="w-full p-2.5 bg-gray-50 border rounded-xl" /></div>
            <div><label className="block text-gray-600 font-bold mb-1">Email SSO</label><input type="text" defaultValue="budi.pratama@uku.co.id" className="w-full p-2.5 bg-gray-50 border rounded-xl" /></div>
            <div><label className="block text-gray-600 font-bold mb-1">No. WhatsApp</label><input type="text" defaultValue="+62 811-9872-4321" className="w-full p-2.5 bg-gray-50 border rounded-xl" /></div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl">Batal</button>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"><Save className="w-4 h-4" /> Simpan</button>
        </div>
      </div>
    </div>
  );
}