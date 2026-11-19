'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from './components/GoogleLoginButton';
import LoginForm from './components/LoginForm';

function LoginFormContent() {
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Header Logo */}
      <header className="w-full bg-white border-b border-gray-100 py-4 px-8">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo UKu" width={120} height={40} className="h-9 w-auto object-contain" priority />
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-gray-100 shadow-xl rounded-3xl p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Logo UKu" width={64} height={64} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-gray-900">Masuk ke UKu</h1>
            <p className="text-xs text-gray-400 mt-1">Kelola keuangan bisnis dan personal Anda</p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs text-center font-medium">
              {errorMessage}
            </div>
          )}

          <GoogleLoginButton onError={setErrorMessage} />

          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <span className="relative bg-white px-3 text-[10px] font-bold text-gray-400 tracking-wider uppercase">ATAU DENGAN EMAIL</span>
          </div>

          <LoginForm onError={setErrorMessage} />

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

export default function LoginPage() {
  return (
    <GoogleOAuthProvider clientId="MASUKKAN_GOOGLE_CLIENT_ID_KAMU_DISINI.apps.googleusercontent.com">
      <LoginFormContent />
    </GoogleOAuthProvider>
  );
}