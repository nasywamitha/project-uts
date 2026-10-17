'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // State untuk menangani form dan koneksi backend
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fungsi handler login terhubung ke backend Express
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Email atau kata sandi salah!');
      }

      // Simpan token JWT & data user ke localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Arahkan ke halaman dashboard
      router.push('/');
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Header Logo */}
      <header className="w-full bg-white border-b border-gray-100 py-4 px-8">
        <div className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Logo UKu" 
            width={120} 
            height={40} 
            className="h-9 w-auto object-contain" 
            priority 
          />
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-10">
          
          {/* Logo di dalam Card */}
          <div className="flex justify-center mb-6">
            <Image 
              src="/logo.png" 
              alt="Logo UKu" 
              width={64} 
              height={64} 
              className="w-16 h-16 rounded-2xl object-cover shadow-sm" 
            />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-gray-900">Masuk ke UKu</h1>
            <p className="text-xs text-gray-400 mt-1">Kelola keuangan bisnis dan personal Anda</p>
          </div>

          {/* Pesan Error jika Login Gagal */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs text-center font-medium">
              {errorMessage}
            </div>
          )}

          {/* Google Login Button */}
          <button 
            type="button" 
            onClick={() => router.push('/')} // Opsi redirect jika login lewat Google
            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-indigo-50/60 hover:bg-indigo-50 border border-indigo-100/60 rounded-2xl text-xs font-semibold text-gray-700 transition mb-5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Login dengan Google
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <span className="relative bg-white px-3 text-[10px] font-bold text-gray-400 tracking-wider uppercase">ATAU DENGAN EMAIL</span>
          </div>

          {/* Form Input dipasangkan event onSubmit={handleLogin} */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Email atau ID Pengguna</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1.5">Kata Sandi</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
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

            <div className="flex justify-end">
              <button
              type="button"
              onClick={() => router.push('/lupa-sandi' )}
                className="text-xs font-semibold text-amber-600 hover:underline">
                Lupa kata sandi?
              </button>
            </div>

            {/* Tombol Login type submit */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Memproses...' : 'Login →'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Belum punya akun?{' '}
              <Link href="/register" className="font-bold text-amber-600 hover:underline">
                Daftar
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