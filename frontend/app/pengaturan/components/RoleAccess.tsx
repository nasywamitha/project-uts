'use client';

import { useState } from 'react';
import { Search, Plus } from 'lucide-react';

export default function RoleAccessTab({ roles }: { roles: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data berdasarkan input pencarian nama admin atau email / role
  const filteredRoles = roles ? roles.filter((item) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleAddRole = () => {
    alert('Fitur Tambah Role akan segera dibuka.');
  };

  const handleEditRole = (id: number) => {
    alert(`Edit role untuk admin dengan ID: ${id}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
      
      {/* Header Tabel: Search & Tombol Tambah */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari admin/role..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-amber-500 text-gray-800" 
          />
        </div>
        <button 
          onClick={handleAddRole}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah Role
        </button>
      </div>

      {/* Tabel Data Role */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-[11px] text-gray-400 uppercase font-semibold border-b border-gray-100">
            <tr>
              <th className="p-3">ADMIN</th>
              <th className="p-3">JABATAN</th>
              <th className="p-3">ROLE</th>
              <th className="p-3 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredRoles && filteredRoles.length > 0 ? (
              filteredRoles.map((admin) => (
                <tr key={admin.id || admin.email} className="hover:bg-gray-50/50 transition">
                  <td className="p-3 font-bold text-gray-800">
                    {admin.name}
                    <br/>
                    <span className="text-[10px] font-normal text-gray-400">{admin.email}</span>
                  </td>
                  <td className="p-3 text-gray-600">{admin.jabatan}</td>
                  <td className="p-3">
                    <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-bold text-[10px]">
                      {admin.role}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => handleEditRole(admin.id)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  {roles && roles.length > 0 ? 'Tidak ditemukan data yang cocok.' : 'Memuat data role admin...'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}