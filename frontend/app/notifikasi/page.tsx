'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { 
  Search, Plus, SlidersHorizontal, MoreVertical, BellRing, Megaphone, Heart, Tag, AlertTriangle, Lightbulb, ChevronLeft, ChevronRight, Bell 
} from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data) => setNotifications(data.data || []));
  }, []);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'bell': return <BellRing className="w-4 h-4 text-amber-500" />;
      case 'megaphone': return <Megaphone className="w-4 h-4 text-amber-500" />;
      case 'heart': return <Heart className="w-4 h-4 text-amber-500" />;
      case 'tag': return <Tag className="w-4 h-4 text-amber-500" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'lightbulb': return <Lightbulb className="w-4 h-4 text-amber-500" />;
      default: return <Bell className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 bg-white">
        <Header />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Kelola Notifikasi AI</h1>
            <p className="text-xs text-gray-400 mt-1">Atur pesan notifikasi, pengumuman, dan informasi aplikasi.</p>
          </div>
          <button className="flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-2.5 bg-amber-500 text-white font-medium text-sm rounded-xl hover:bg-amber-600">
            <Plus className="w-4 h-4" /> Buat Notifikasi
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <button className="px-4 py-2 bg-amber-500 text-white font-semibold text-xs rounded-xl">AI Notifikasi</button>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input type="text" placeholder="Filter notifikasi..." className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-[11px] text-gray-400 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="p-3 pl-4">ID</th>
                <th className="p-3">PESAN</th>
                <th className="p-3 text-center">TIPE</th>
                <th className="p-3">TANGGAL</th>
                <th className="p-3 text-center">STATUS</th>
                <th className="p-3 text-right pr-4">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notifications.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60">
                  <td className="p-4 pl-4 text-xs font-semibold text-gray-500">{item.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {renderIcon(item.iconType)}
                      <span className="text-xs font-semibold text-gray-800">{item.pesan}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="bg-indigo-50 text-indigo-500 px-3 py-1 rounded-full text-[11px] font-medium inline-block">{item.type}</span>
                  </td>
                  <td className="p-4 text-xs text-gray-500">{item.tanggal}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold inline-block ${item.status === 'Aktif' ? 'bg-emerald-100/70 text-emerald-600' : 'bg-indigo-50/80 text-indigo-400'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-4 space-x-2">
                    <button className="text-xs font-semibold text-gray-600 hover:text-amber-600">Edit</button>
                    <button className="text-gray-400 hover:text-gray-600 inline-block align-middle ml-1"><MoreVertical className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400">
            <p>Menampilkan 1–6 dari 24 entri notifikasi</p>
            <div className="flex items-center gap-2 font-semibold">
              <button className="p-1 text-gray-300"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-7 h-7 bg-amber-500 text-white rounded-lg flex items-center justify-center">1</button>
              <button className="w-7 h-7 hover:bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">2</button>
              <button className="w-7 h-7 hover:bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">3</button>
              <button className="p-1 text-gray-600"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}