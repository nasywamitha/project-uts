'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { UserCheck, KeyRound, ShieldCheck, LogOut } from 'lucide-react';
import { settingsService } from '@/services/settingService'; // Sesuaikan path jika berbeda

// Import Komponen Tab Terpisah
import AdminProfileTab from './components/AdminProfile';
import ChangePasswordTab from './components/ChangePassword';
import RoleAccessTab from './components/RoleAccess';
import SessionLogoutTab from './components/Logout';

function useSettings() {
  const [activeTab, setActiveTab] = useState('profil');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    jabatan: '',
    phone: '',
    empId: '',
    status: '',
  });
  const [roles] = useState([
    { id: 1, name: 'Super Admin', members: 1, permissions: ['Semua Akses'] },
    { id: 2, name: 'Admin Sistem', members: 2, permissions: ['Kelola Pengguna', 'Kelola Akses'] },
  ]);
  const [sessions, setSessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'Jakarta, ID', status: 'Aktif', lastActive: 'Baru saja' },
    { id: 2, device: 'Safari on iPhone', location: 'Bandung, ID', status: 'Aman', lastActive: '10 menit lalu' },
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // 1. Ambil data profil asli dari backend saat halaman pertama kali dibuka
  useEffect(() => {
    settingsService.getProfile()
      .then((res: any) => {
        const data = res.data || res;
        setProfile(data);
      })
      .catch((err: any) => {
        console.error('Gagal memuat profil:', err);
      });
  }, []);

  // 2. Fungsi Simpan yang terhubung langsung ke Backend & Database
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      await settingsService.updateProfile({
        name: profile.name,
        jabatan: profile.jabatan,
        phone: profile.phone,
      });
      alert('Profil berhasil diperbarui!');
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan perubahan profil');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    activeTab,
    setActiveTab,
    profile,
    setProfile,
    roles,
    sessions,
    setSessions,
    handleSave,
    isSaving,
  };
}

export default function SettingsPage() {
  const { 
    activeTab, 
    setActiveTab, 
    profile, 
    setProfile, 
    roles, 
    sessions, 
    setSessions,
    handleSave, 
    isSaving 
  } = useSettings();

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
                className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
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

        {/* Tab Content Display dengan Props Data Backend */}
        {activeTab === 'profil' && (
          <AdminProfileTab 
            profile={profile} 
            setProfile={setProfile} 
            handleSave={handleSave} 
            isSaving={isSaving} 
          />
        )}
        
        {activeTab === 'password' && <ChangePasswordTab />}
        
        {activeTab === 'role' && (
          <RoleAccessTab roles={roles} />
        )}
        
        {activeTab === 'logout' && (
          <SessionLogoutTab sessions={sessions} setSessions={setSessions} />
        )}
      </main>
    </div>
  );
}