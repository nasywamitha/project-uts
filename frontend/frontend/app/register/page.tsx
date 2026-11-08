'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // 1. Tambahkan state untuk menampung input form
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Perbaiki fungsi handleRegister agar menggunakan state di atas
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama,       // Mengambil dari state nama
          email,      // Mengambil dari state email
          whatsapp,   // Mengambil dari state whatsapp
          password,   // Mengambil dari state password
          role: 'User'
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registrasi gagal!');
      }

      alert('Registrasi berhasil! Silakan login.');
      router.push('/login');
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <header className="w-full bg-white border-b border-gray-100 py-4 px-8">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo UKu" width={110} height={35} className="h-8 w-auto object-contain" priority />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-10">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900">Buat Akun UKu</h1>
            <p className="text-xs text-gray-400 mt-1">Mulai kelola keuangan Anda secara rapi dan profesional.</p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs text-center font-medium">
              {errorMessage}
            </div>
          )}

          {/* Pastikan form memanggil handleRegister */}
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
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-2xl shadow-md transition mt-2"
            >
              {loading ? 'Memproses...' : 'Daftar Akun'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Sudah punya akun?{' '}
              <Link href="/login" className="font-bold text-amber-600 hover:underline">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-[11px] text-gray-400">
        © 2026 UKu Financial. All rights reserved.
      </footer>
    </div>
  );
}