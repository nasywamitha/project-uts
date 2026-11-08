'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { UserCheck, KeyRound, ShieldCheck, LogOut } from 'lucide-react';

// Import Komponen Tab Terpisah
import AdminProfileTab from './components/AdminProfile';
import ChangePasswordTab from './components/ChangePassword';
import RoleAccessTab from './components/RoleAccess';
import SessionLogoutTab from './components/Logout';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profil' | 'password' | 'role' | 'logout'>('profil');

  const tabs = [
    { id: 'profil', label: 'Profil Admin', icon: UserCheck, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'password', label: 'Ubah Password', icon: KeyRound, color: 'text-amber-600 bg-amber-50' },
    { id: 'role', label: 'Role & Akses', icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'logout', label: 'Logout Sesi', icon: LogOut, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-white">
        <Header />

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeTab === 'role' ? 'Manajemen Role & Hak Akses Admin' : activeTab === 'logout' ? 'Manajemen Sesi & Keamanan Logout' : 'Pengaturan Admin & Preferensi Sistem'}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Kelola profil kredensial, hak akses tim, dan sesi otentikasi aktif secara terpusat.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-4 rounded-2xl border text-left transition ${
                  isActive ? 'border-amber-500 ring-1 ring-amber-500 bg-white' : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`p-2 rounded-xl w-fit mb-3 ${tab.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-800 text-xs sm:text-sm">{tab.label}</h3>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        {activeTab === 'profil' && <AdminProfileTab />}
        {activeTab === 'password' && <ChangePasswordTab />}
        {activeTab === 'role' && <RoleAccessTab />}
        {activeTab === 'logout' && <SessionLogoutTab />}
      </main>
    </div>
  );
}