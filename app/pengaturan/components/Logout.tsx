'use client';

import { Laptop, Smartphone, LogOut, Lock } from 'lucide-react';
import { settingsService } from '@/services/settingService';

export default function SessionLogoutTab({ sessions, setSessions }: { sessions: any[]; setSessions: any }) {
  
  // Fungsi untuk mengakhiri sesi perangkat tertentu
  const handleTerminate = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin mengakhiri sesi perangkat ini?')) return;
    
    try {
      await settingsService.terminateSession(id);
      // Perbarui state lokal agar perangkat langsung hilang dari daftar
      setSessions((prev: any[]) => prev.filter((session) => session.id !== id));
      alert('Sesi berhasil diakhiri.');
    } catch (error) {
      console.error(error);
      alert('Gagal mengakhiri sesi.');
    }
  };

  // Fungsi untuk logout dari semua/konsol aktif
  const handleLogoutAll = async () => {
    if (!confirm('Apakah Anda ingin keluar dari konsol sekarang?')) return;

    try {
      await settingsService.logoutAll();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');

      // Hapus cookie token agar middleware langsung mengarahkan ke /login
      document.cookie = 'token=; path=/; max-age=0; SameSite=Lax';

      window.location.href = '/login';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Kolom Kiri: Daftar Perangkat Aktif */}
      <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-800 text-sm mb-4">Perangkat Aktif</h3>
        
        <div className="space-y-3 text-xs">
          {sessions && sessions.length > 0 ? (
            sessions.map((session) => (
              <div key={session.id} className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Kondisi ikon berdasarkan jenis perangkat */}
                  {session.device.toLowerCase().includes('iphone') || session.device.toLowerCase().includes('android') ? (
                    <Smartphone className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Laptop className="w-5 h-5 text-gray-600" />
                  )}
                  <div>
                    <p className="font-bold text-gray-800">
                      {session.device} 
                      {session.isCurrent && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded ml-1">
                          Sesi Ini
                        </span>
                      )}
                    </p>
                    <p className="text-gray-400">{session.os}</p>
                  </div>
                </div>

                {/* Tombol akhiri hanya muncul jika bukan sesi aktif saat ini */}
                {!session.isCurrent && (
                  <button 
                    onClick={() => handleTerminate(session.id)}
                    className="px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-bold transition cursor-pointer"
                  >
                    Akhiri
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">Memuat data perangkat aktif...</p>
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
            onClick={handleLogoutAll}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout Sekarang
          </button>
          <button 
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