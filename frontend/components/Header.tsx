'use client';

import { useState } from 'react';
import { Bell, Check, UserPlus, ShieldAlert, Info, Search } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 1,
      title: 'Pendaftaran Pengguna Baru',
      desc: 'Andi Pratama telah terdaftar ke sistem.',
      time: '5 menit yang lalu',
      isRead: false,
      icon: UserPlus,
      color: 'text-blue-500 bg-blue-50',
      link: '/pengguna/USR-8831',
    },
    {
      id: 2,
      title: 'Percobaan Login mencurigakan',
      desc: '3 kali gagal login pada akun Fajar Nugroho.',
      time: '1 jam yang lalu',
      isRead: false,
      icon: ShieldAlert,
      color: 'text-red-500 bg-red-50',
      link: '/pengguna/USR-8827',
    },
    {
      id: 3,
      title: 'Pembaruan Sistem',
      desc: 'Versi v1.0.1 akan diperbarui malam ini.',
      time: '3 jam yang lalu',
      isRead: true,
      icon: Info,
      color: 'text-amber-500 bg-amber-50',
      link: '/notifikasi',
    },
  ];

  return (
    <header className="flex justify-between items-center gap-2 sm:gap-4 mb-6 sm:mb-8 relative">
     {/* Input Pencarian Global Header */}
<div className="relative w-32 sm:w-72 lg:w-96 shrink">
  <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
  <input
    type="text"
    placeholder="Cari transaksi, pengguna, data..."
    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
  />
</div>

      {/* Notifikasi & Profil Admin */}
      <div className="flex items-center gap-2 sm:gap-4 relative shrink-0">
        {/* Tombol Lonceng Notifikasi */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition relative bg-white"
          >
            <Bell className="w-4 h-4 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown Menu Notifikasi */}
          {isOpen && (
            <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-5rem))] bg-white rounded-2xl border border-gray-200 shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs text-gray-800">Notifikasi</h4>
                  <span className="bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                    {unreadCount} Baru
                  </span>
                </div>
                <button
                  onClick={() => setUnreadCount(0)}
                  className="text-[11px] text-amber-600 hover:underline font-semibold flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Tandai Dibaca
                </button>
              </div>

              {/* Daftar Item Notifikasi */}
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.link}
                      onClick={() => setIsOpen(false)}
                      className={`p-3.5 flex gap-3 hover:bg-gray-50 transition block ${
                        !item.isRead ? 'bg-amber-50/20' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-xl h-fit ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-800">{item.title}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{item.desc}</p>
                        <span className="text-[10px] text-gray-400 mt-1.5 block">{item.time}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Tautan ke Halaman /notifikasi */}
              <Link
                href="/notifikasi"
                onClick={() => setIsOpen(false)}
                className="block text-center py-3 bg-gray-50 text-xs font-bold text-amber-600 hover:bg-gray-100 transition border-t border-gray-100"
              >
                Lihat Semua Notifikasi →
              </Link>
            </div>
          )}
        </div>

        {/* Profil Admin */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
            BP
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-gray-800 leading-tight">Budi Pratama</p>
            <p className="text-[10px] text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}