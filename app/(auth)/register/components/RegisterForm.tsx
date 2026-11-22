'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { registerUser } from '@/services/authService';

export default function RegisterForm({ onError }: { onError: (msg: string) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onError('');

    try {
      await registerUser({
        nama,
        email,
        whatsapp,
        password,
        role: 'User',
      });

      alert('Registrasi berhasil! Silakan login.');
      router.push('/login');
    } catch (error: any) {
      onError(
        error.response?.data?.message || error.message || 'Registrasi gagal!'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Nama Lengkap *</label>
        <input
          type="text"
          placeholder="Masukkan nama lengkap Anda"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
          className="w-full px-4 py-3 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Email Aktif *</label>
          <input
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Nomor WhatsApp *</label>
          <input
            type="text"
            placeholder="0812 3456 7890"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            required
            className="w-full px-4 py-3 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Kata Sandi *</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-4 pr-10 py-3 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-2xl shadow-md transition mt-2 cursor-pointer disabled:opacity-50"
      >
        {loading ? 'Memproses...' : 'Daftar Akun'}
      </button>
    </form>
  );
}