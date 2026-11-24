'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserCheck, KeyRound, ShieldCheck, LogOut } from 'lucide-react';
import { settingsService, AdminAccessItem, ActiveSessionItem } from '@/services/settingsService';

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
  const [admins, setAdmins] = useState<AdminAccessItem[]>([]);
  const [sessions, setSessions] = useState<ActiveSessionItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // 1. Ambil data profil asli dari backend saat halaman pertama kali dibuka
  useEffect(() => {
    settingsService
      .getProfile()
      .then((res: any) => {
        const data = res.data || res;
        setProfile(data);
      })
      .catch((err: any) => {
        console.error('Gagal memuat profil:', err);
      });
  }, []);

  // 2. Ambil daftar admin asli dari backend (role tunggal: Admin)
  const refreshAdmins = useCallback(async () => {
    try {
      const data = await settingsService.getAdmins();
      setAdmins(data);
    } catch (err: any) {
      console.error('Gagal memuat daftar admin:', err);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'role') {
      refreshAdmins();
    }
  }, [activeTab, refreshAdmins]);

  // 2b. Ambil daftar perangkat/sesi aktif asli dari backend saat tab Logout Sesi dibuka
  const refreshSessions = useCallback(async () => {
    try {
      const data = await settingsService.getSessions();
      if (Array.isArray(data)) {
        setSessions(data);
      }
    } catch (err: any) {
      console.error('Gagal memuat daftar perangkat aktif:', err);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'logout') {
      refreshSessions();
    }
  }, [activeTab, refreshSessions]);

  // 3. Fungsi Simpan Profil yang terhubung langsung ke Backend & Database
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
    admins,
    refreshAdmins,
    sessions,
    setSessions,
    refreshSessions,
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
    admins,
    refreshAdmins,
    sessions,
    setSessions,
    handleSave,
    isSaving,
  } = useSettings();

  const tabs = [
    { id: 'profil', label: 'Profil Admin', icon: UserCheck, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'password', label: 'Ubah Password', icon: KeyRound, color: 'text-amber-600 bg-amber-50' },
    { id: 'role', label: 'Role & Akses', icon: ShieldCheck, color: 'text-indigo-600 bg-indigo-50' },
    { id: 'logout', label: 'Logout Sesi', icon: LogOut, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <>
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {activeTab === 'role'
            ? 'Manajemen Role & Hak Akses Admin'
            : activeTab === 'logout'
            ? 'Manajemen Sesi & Keamanan Logout'
            : 'Pengaturan Admin & Preferensi Sistem'}
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
        <RoleAccessTab roles={admins} onRefresh={refreshAdmins} />
      )}

      {activeTab === 'logout' && (
        <SessionLogoutTab sessions={sessions} setSessions={setSessions} />
      )}
    </>
  );
}