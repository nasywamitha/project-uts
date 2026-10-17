'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function LupaSandiPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fungsi pengiriman permintaan reset password (Simulasi Sementara)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Simulasi jeda waktu jaringan 1 detik
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Langsung ubah ke state berhasil (tampilan centang hijau)
      setIsSuccess(true);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Header Logo Top Left */}
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

      {/* Main Card Content */}
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

          {!isSuccess ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-gray-900">Lupa Kata Sandi?</h1>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                  Masukkan alamat email yang terdaftar pada akun UKu Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
                </p>
              </div>

              {/* Alert Error */}
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs text-center font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Form Input Email */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1.5">
                    Email Terdaftar *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                </div>

                {/* Tombol Kirim */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {loading ? 'Memproses...' : 'Kirim Tautan Reset →'}
                </button>
              </form>
            </>
          ) : (
            /* Tampilan Sukses Setelah Email Terkirim */
            <div className="text-center py-4">
              <div className="flex justify-center mb-3 text-emerald-500">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Email Terkirim!</h2>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Tautan untuk mengatur ulang kata sandi telah dikirimkan ke email <span className="font-semibold text-gray-800">{email}</span>. Silakan periksa kotak masuk atau folder spam Anda.
              </p>
              
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="mt-6 text-xs font-semibold text-amber-600 hover:underline block mx-auto"
              >
                Kirim ulang email
              </button>
            </div>
          )}

          {/* Link Kembali ke Login */}
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <Link 
              href="/login" 
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-amber-600 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Halaman Masuk
            </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-[11px] text-gray-400">
        © 2026 UKu Financial. All rights reserved.
      </footer>
    </div>
  );
}