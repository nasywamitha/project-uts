'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RegisterForm from './components/RegisterForm';

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState('');

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

          {/* Memanggil komponen form terpisah */}
          <RegisterForm onError={setErrorMessage} />

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