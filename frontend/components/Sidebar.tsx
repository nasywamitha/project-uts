'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderTree } from 'lucide-react';
import dashboardIcon from './assets/Windows 11.png';
import usersIcon from './assets/User.png';
import notificationsIcon from './assets/AI.png';
import featureUsageIcon from './assets/Reducing Churn.png';
import reportsIcon from './assets/Graph Report.png';
import settingsIcon from './assets/Settings (1).png';
import Logo from './assets/Logo.png';

const menuItems = [
  { name: 'Dashboard', href: '/', image: dashboardIcon },
  { name: 'Pengguna', href: '/pengguna', image: usersIcon },
  { name: 'Kategori', href: '/kategori', icon: FolderTree },
  { name: 'AI Notifikasi', href: '/notifikasi', image: notificationsIcon },
  { name: 'Penggunaan Fitur', href: '/fitur', image: featureUsageIcon },
  { name: 'Laporan', href: '/laporan', image: reportsIcon },
  { name: 'Pengaturan', href: '/pengaturan', image: settingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-14 sm:w-20 lg:w-64 shrink-0 bg-white border-r border-gray-100 min-h-screen p-2 sm:p-3 lg:p-4 flex flex-col justify-between">
      <div>
        <div className="flex bg-amber-300 rounded-xl items-center justify-center lg:justify-start gap-2 px-1 lg:px-3 py-2 mb-6">
          <div className="text-white rounded-xl shrink-0">
            <Image src={Logo}
              alt="UKu Logo"
              className="w-8 h-8" />
          </div>
          <div className="hidden lg:block gap-0">
            <span className="font-bold text-2xl text-white">U</span>
            <span className="font-bold text-2xl text-amber-500">K</span>
            <span className="font-bold text-2xl text-white">u</span>
          </div>
        </div>


        <div className="hidden lg:block text-xs font-semibold text-gray-400 px-3 mb-2 uppercase tracking-wider">
          Menu Utama
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={item.name}
                className={`w-full flex items-center gap-3 px-1 lg:px-3 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                } justify-center lg:justify-start`}
              >
                {'image' in item ? (
                  <Image src={item.image!} alt="" className="w-5 h-5 object-contain" />
                ) : (
                  <item.icon className="w-5 h-5" />
                )}
                <span className="hidden lg:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}