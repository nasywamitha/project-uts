'use client';

import { Search, Plus } from 'lucide-react';

export default function RoleAccessTab() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input type="text" placeholder="Cari admin/role..." className="w-full pl-9 pr-3 py-2 bg-gray-50 border rounded-xl text-xs" />
        </div>
        <button className="px-4 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"><Plus className="w-4 h-4" /> Tambah Role</button>
      </div>
      <table className="w-full text-left text-xs">
        <thead className="bg-gray-50 text-[11px] text-gray-400 uppercase font-semibold border-b">
          <tr><th className="p-3">ADMIN</th><th className="p-3">JABATAN</th><th className="p-3">ROLE</th><th className="p-3 text-right">AKSI</th></tr>
        </thead>
        <tbody className="divide-y">
          <tr>
            <td className="p-3 font-bold">Siti Nurhaliza<br/><span className="text-[10px] font-normal text-gray-400">siti.nurhaliza@uku.co.id</span></td>
            <td className="p-3">Head of Finance Ops</td>
            <td className="p-3"><span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-bold text-[10px]">Super Admin</span></td>
            <td className="p-3 text-right"><button className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-bold">Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}