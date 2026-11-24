'use client';

import { useEffect, useState } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { settingsService } from '@/services/settingsService';

type PasswordHistoryItem = {
  id: string;
  timestamp: string;
  status: 'Berhasil';
};

const STORAGE_KEY = 'uku_password_update_history';

const formatNowWIB = () => {
  const now = new Date();
  const tanggal = now.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  });
  const jam = now
    .toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Jakarta',
    })
    .replace(':', '.');

  return `${tanggal} • ${jam} WIB`;
};

export default function ChangePasswordTab() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [history, setHistory] = useState<PasswordHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Gagal memuat riwayat pembaruan password:', err);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert('Password baru dan konfirmasi password tidak cocok!');
      return;
    }

    if (formData.newPassword.length < 8) {
      alert('Password baru minimal harus 8 karakter!');
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.newPassword)) {
      alert('Password baru harus mengandung huruf besar dan huruf kecil!');
      return;
    }

    setIsLoading(true);
    try {
      await settingsService.updatePassword({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      const newEntry: PasswordHistoryItem = {
        id: String(Date.now()),
        timestamp: formatNowWIB(),
        status: 'Berhasil',
      };

      setHistory((prev) => {
        const updated = [newEntry, ...prev].slice(0, 10);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (err) {
          console.error('Gagal menyimpan riwayat pembaruan password:', err);
        }
        return updated;
      });

      alert('Password berhasil diperbarui!');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Terjadi kesalahan saat memperbarui password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-800 text-sm mb-4">Ubah Password</h3>
        <div className="space-y-3 text-xs">
          {/* Password Saat Ini */}
          <div>
            <label className="block font-bold text-gray-700 mb-1">Password Saat Ini</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Masukkan password saat ini"
                required
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Password Baru */}
          <div>
            <label className="block font-bold text-gray-700 mb-1">Password Baru</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Masukkan password baru"
                required
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Validasi Info */}
          <div className="bg-gray-50 p-3 rounded-xl border grid grid-cols-2 gap-2 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <CheckCircle className="w-3.5 h-3.5" /> Min. 8 Karakter
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <CheckCircle className="w-3.5 h-3.5" /> Huruf Besar & Kecil
            </span>
          </div>

          {/* Konfirmasi Password Baru */}
          <div>
            <label className="block font-bold text-gray-700 mb-1">Konfirmasi Password Baru</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password baru"
                required
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl mt-2 transition cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Memperbarui...' : 'Perbarui Password →'}
          </button>
        </div>
      </div>

      {/* Riwayat Pembaruan Realtime */}
      <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="font-bold text-gray-800 text-sm mb-4">Riwayat Pembaruan</h3>
        <div className="space-y-2.5">
          {history.length === 0 ? (
            <p className="text-xs text-gray-400">Belum ada riwayat pembaruan password.</p>
          ) : (
            history.map((item) => (
              <div key={item.id} className="p-3 bg-gray-50 rounded-xl border text-xs">
                <p className="font-bold text-gray-800">{item.timestamp}</p>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold mt-1 inline-block">
                  {item.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </form>
  );
}