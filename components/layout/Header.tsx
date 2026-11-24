'use client';

import { useEffect, useState } from 'react';
import { Bell, Check, UserPlus, ShieldAlert, Info, Search, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { settingsService } from '@/services/settingsService';

export default function Header() {
  const { user } = useAuth() as { user: any };

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [profileFallback, setProfileFallback] = useState<{
    name?: string;
    email?: string;
    role?: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    settingsService
      .getProfile()
      .then((res: any) => {
        if (!active) return;
        const data = res?.data || res;
        if (data) {
          setProfileFallback({
            name: data.name || data.nama,
            email: data.email,
            role: data.role,
          });
        }
      })
      .catch(() => {
        // Biarkan pakai data dari useAuth bila endpoint profil belum merespons
      });

    return () => {
      active = false;
    };
  }, []);

  const displayName =
    user?.name || user?.nama || profileFallback?.name || 'Admin';
  const displayEmail =
    user?.email || profileFallback?.email || '-';
  const displayRole =
    user?.role || profileFallback?.role || 'Admin';

  // Ambil inisial nama untuk avatar (Contoh: "Admin UKu" menjadi "AU")
  const getInitials = (name: string) => {
    const clean = (name || 'Admin').trim();
    if (!clean) return 'AD';
    return clean
      .split(/\s+/)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

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

  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      // Opsional: panggil endpoint logout BE jika sudah ada
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // 1. Bersihkan semua data sesi di localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');

      // 2. Hapus cookie token (harus sama path & SameSite-nya dengan saat login)
      document.cookie = 'token=; path=/; max-age=0; SameSite=Lax';

      // 3. Arahkan ke halaman /login
      window.location.href = '/login';
    }
  };

  return (
    <header className="flex justify-between items-center gap-2 sm:gap-4 mb-6 sm:mb-8 relative z-40">
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
            type="button"
            onClick={() => {
              setIsNotifOpen(!isNotifOpen);
              setIsProfileOpen(false);
            }}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition relative bg-white cursor-pointer"
          >
            <Bell className="w-4 h-4 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown Menu Notifikasi */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-3 w-[min(20rem,calc(100vw-5rem))] bg-white rounded-2xl border border-gray-200 shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs text-gray-800">Notifikasi</h4>
                  <span className="bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                    {unreadCount} Baru
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setUnreadCount(0)}
                  className="text-[11px] text-amber-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3 h-3" /> Tandai Dibaca
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      href={item.link}
                      onClick={() => setIsNotifOpen(false)}
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

              <Link
                href="/notifikasi"
                onClick={() => setIsNotifOpen(false)}
                className="block text-center py-3 bg-gray-50 text-xs font-bold text-amber-600 hover:bg-gray-100 transition border-t border-gray-100"
              >
                Lihat Semua Notifikasi →
              </Link>
            </div>
          )}
        </div>

        {/* Profil Admin & Dropdown Logout */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotifOpen(false);
            }}
            className="flex items-center gap-3 focus:outline-none hover:opacity-80 transition cursor-pointer p-1 rounded-xl"
          >
            {/* Avatar Dinamis berdasarkan nama user */}
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
              {getInitials(displayName)}
            </div>
            <div className="hidden sm:block text-left">
              {/* Nama Dinamis */}
              <p className="text-xs font-bold text-gray-800 leading-tight">
                {displayName}
              </p>
              {/* Role Dinamis */}
              <p className="text-[10px] text-gray-400">{displayRole}</p>
            </div>
          </button>

          {/* Dropdown Menu Profil & Logout */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl border border-gray-200 shadow-2xl z-50 overflow-hidden">
              {/* Header Info Akun */}
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <p className="text-xs font-bold text-gray-800">{displayName}</p>
                <p className="text-[11px] text-gray-500 truncate mt-0.5">
                  {displayEmail}
                </p>
              </div>

              {/* Menu Langsung ke Halaman Pengaturan Utama */}
              <div className="p-1.5">
                <Link
                  href="/pengaturan"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded-xl transition font-medium cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  Pengaturan Akun
                </Link>
              </div>

              {/* Tombol Logout / Keluar Sesi */}
              <div className="p-1.5 border-t border-gray-100 bg-gray-50/30">
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loadingLogout}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition font-semibold disabled:opacity-50 cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <LogOut className="w-4 h-4 text-red-500" />
                    {loadingLogout ? 'Keluar...' : 'Keluar Sesi'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}