'use client';

import { useCallback, useEffect, useState } from 'react';
import { Laptop, Smartphone, LogOut, Lock } from 'lucide-react';
import { settingsService, ActiveSessionItem } from '@/services/settingsService';

interface SessionLogoutTabProps {
  sessions?: ActiveSessionItem[];
  setSessions?: React.Dispatch<React.SetStateAction<ActiveSessionItem[]>>;
}

export default function SessionLogoutTab({
  sessions = [],
  setSessions,
}: SessionLogoutTabProps) {
  const [localSessions, setLocalSessions] = useState<ActiveSessionItem[]>(sessions);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [terminatingId, setTerminatingId] = useState<number | string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const updateSessionsState = useCallback(
    (next: ActiveSessionItem[]) => {
      setLocalSessions(next);
      if (setSessions) {
        setSessions(next);
      }
    },
    [setSessions]
  );

  useEffect(() => {
    if (Array.isArray(sessions) && sessions.length > 0) {
      setLocalSessions(sessions);
    }
  }, [sessions]);

  const fetchLatestSessions = useCallback(
    async (showLoader = false) => {
      if (showLoader) {
        setIsLoading(true);
      }
      try {
        const data = await settingsService.getSessions();
        if (Array.isArray(data)) {
          updateSessionsState(data);
        }
      } catch (error) {
        console.error('Gagal menyinkronkan perangkat aktif:', error);
      } finally {
        if (showLoader) {
          setIsLoading(false);
        }
      }
    },
    [updateSessionsState]
  );

  useEffect(() => {
    fetchLatestSessions(!sessions || sessions.length === 0);

    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === 'visible') {
        fetchLatestSessions(false);
      }
    };

    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);

    return () => {
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
    };
  }, [fetchLatestSessions]);

  // Fungsi untuk mengakhiri sesi perangkat tertentu
  const handleTerminate = async (id: number | string) => {
    if (!confirm('Apakah Anda yakin ingin mengakhiri sesi perangkat ini?')) return;

    setTerminatingId(id);
    try {
      await settingsService.terminateSession(id);
      const filtered = localSessions.filter((session) => session.id !== id);
      updateSessionsState(filtered);
      await fetchLatestSessions(false);
      alert('Sesi berhasil diakhiri.');
    } catch (error: any) {
      console.error(error);
      alert(error?.message || 'Gagal mengakhiri sesi.');
    } finally {
      setTerminatingId(null);
    }
  };

  // Fungsi untuk logout dari semua/konsol aktif
  const handleLogoutAll = async () => {
    if (!confirm('Apakah Anda ingin keluar dari konsol sekarang?')) return;

    setIsLoggingOut(true);
    try {
      await settingsService.logoutAll();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');

      // Hapus cookie token agar middleware langsung mengarahkan ke /login
      document.cookie = 'token=; path=/; max-age=0; SameSite=Lax';

      window.location.href = '/login';
    }
  };

  const displayedSessions = localSessions.length > 0 ? localSessions : sessions;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Kolom Kiri: Daftar Perangkat Aktif */}
      <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-800 text-sm mb-4">Perangkat Aktif</h3>

        <div className="space-y-3 text-xs">
          {isLoading && (!displayedSessions || displayedSessions.length === 0) ? (
            <p className="text-gray-400 text-center py-4">Memuat data perangkat aktif...</p>
          ) : displayedSessions && displayedSessions.length > 0 ? (
            displayedSessions.map((session: any) => {
              const deviceLabel = session.device || 'Perangkat Aktif';
              const isMobile =
                deviceLabel.toLowerCase().includes('iphone') ||
                deviceLabel.toLowerCase().includes('android');

              return (
                <div
                  key={session.id}
                  className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {/* Kondisi ikon berdasarkan jenis perangkat */}
                    {isMobile ? (
                      <Smartphone className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Laptop className="w-5 h-5 text-gray-600" />
                    )}
                    <div>
                      <p className="font-bold text-gray-800">
                        {deviceLabel}
                        {session.isCurrent && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded ml-1">
                            Sesi Ini
                          </span>
                        )}
                      </p>
                      <p className="text-gray-400">
                        {session.os || session.location || session.lastActive || 'Sesi aktif'}
                      </p>
                    </div>
                  </div>

                  {/* Tombol akhiri hanya muncul jika bukan sesi aktif saat ini */}
                  {!session.isCurrent && (
                    <button
                      type="button"
                      disabled={terminatingId === session.id}
                      onClick={() => handleTerminate(session.id)}
                      className="px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-bold transition cursor-pointer disabled:opacity-50"
                    >
                      {terminatingId === session.id ? 'Mengakhiri...' : 'Akhiri'}
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-400 text-center py-4">Tidak ada perangkat aktif.</p>
          )}
        </div>
      </div>

      {/* Kolom Kanan: Keluar Konsol & Kunci Layar */}
      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-800 text-sm mb-2">Keluar Konsol</h3>
          <p className="text-xs text-gray-400 mb-4">Akhiri sesi kerja dan hapus token otentikasi aktif.</p>
        </div>
        <div className="space-y-2">
          <button
            type="button"
            disabled={isLoggingOut}
            onClick={handleLogoutAll}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" /> {isLoggingOut ? 'Memproses...' : 'Logout Sekarang'}
          </button>
          <button
            type="button"
            onClick={() => alert('Fitur kunci layar diaktifkan.')}
            className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Lock className="w-4 h-4" /> Kunci Layar
          </button>
        </div>
      </div>
    </div>
  );
}