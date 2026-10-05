'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FolderTree, 
  Bell, 
  BarChart3, 
  FileText, 
  Settings,
  Wallet
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Pengguna', href: '/pengguna', icon: Users },
  { name: 'Kategori', href: '/kategori', icon: FolderTree },
  { name: 'Notifikasi', href: '/notifikasi', icon: Bell },
  { name: 'Penggunaan Fitur', href: '/fitur', icon: BarChart3 },
  { name: 'Laporan', href: '/laporan', icon: FileText },
  { name: 'Pengaturan', href: '/pengaturan', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 px-3 py-2 mb-6">
          <div className="bg-amber-500 text-white p-2 rounded-xl">
            <Wallet className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl text-gray-800">UKu</span>
        </div>

        <div className="text-xs font-semibold text-gray-400 px-3 mb-2 uppercase tracking-wider">
          Menu Utama
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="bg-slate-50 p-3 rounded-xl flex items-center justify-between text-xs text-gray-500">
        <div>
          <p className="font-medium text-gray-700">Status Sistem</p>
          <p>Versi 1.0.0</p>
        </div>
        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
      </div>
    </aside>
  );
}