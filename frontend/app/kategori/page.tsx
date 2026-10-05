'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { 
  Plus, MoreVertical, Utensils, Car, ShoppingBag, GraduationCap, Shirt, Heart, Glasses, Home, Sparkles, PawPrint, Plane, Bed, FolderTree 
} from 'lucide-react';

const iconMap: Record<string, any> = {
  'utensils': Utensils, 'car': Car, 'shopping-bag': ShoppingBag, 'graduation-cap': GraduationCap,
  'shirt': Shirt, 'heart': Heart, 'glasses': Glasses, 'home': Home, 'sparkles': Sparkles,
  'paw-print': PawPrint, 'plane': Plane, 'bed': Bed,
};

export default function CategoryPage() {
  const [activeTab, setActiveTab] = useState<'Pengeluaran' | 'Pemasukan'>('Pengeluaran');
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/categories?type=${activeTab}`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []));
  }, [activeTab]);

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <main className="flex-1 p-8 bg-white">
        <Header />

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Kategori Keuangan</h1>
            <p className="text-xs text-gray-400 mt-1">Kelola kategori yang tersedia di aplikasi.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 text-white font-medium text-sm rounded-xl hover:bg-amber-600">
            <Plus className="w-4 h-4" /> Tambah Kategori
          </button>
        </div>

        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
          <button onClick={() => setActiveTab('Pengeluaran')} className={`px-5 py-2 text-xs font-semibold rounded-lg transition ${activeTab === 'Pengeluaran' ? 'bg-amber-500 text-white' : 'text-gray-500'}`}>
            Pengeluaran
          </button>
          <button onClick={() => setActiveTab('Pemasukan')} className={`px-5 py-2 text-xs font-semibold rounded-lg transition ${activeTab === 'Pemasukan' ? 'bg-amber-500 text-white' : 'text-gray-500'}`}>
            Pemasukan
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            <h2 className="font-bold text-gray-800 text-sm">Kategori {activeTab}</h2>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{categories.length} Kategori</span>
          </div>
          <span className="text-xs text-gray-400">Kebutuhan alokasi biaya</span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-[11px] text-gray-400 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="p-4 pl-6">Nama Kategori</th>
                <th className="p-4 text-center">Ikon</th>
                <th className="p-4 text-center">Tipe</th>
                <th className="p-4 text-right pr-6">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((item) => {
                const IconComponent = iconMap[item.icon] || FolderTree;
                return (
                  <tr key={item.id} className="hover:bg-gray-50/60">
                    <td className="p-4 pl-6 font-bold text-gray-800">{item.name}</td>
                    <td className="p-4 text-center">
                      <div className="w-9 h-9 bg-amber-100/70 text-amber-600 rounded-xl inline-flex items-center justify-center">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="bg-indigo-50 text-indigo-500 px-3 py-1 rounded-full text-xs font-medium inline-block">
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 text-right pr-6 space-x-3">
                      <button className="text-xs font-semibold text-gray-600 hover:text-amber-600">Edit</button>
                      <button className="text-xs font-semibold text-red-500 hover:text-red-700">Hapus</button>
                      <button className="text-gray-400 hover:text-gray-600 inline-block align-middle ml-1"><MoreVertical className="w-4 h-4" /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}