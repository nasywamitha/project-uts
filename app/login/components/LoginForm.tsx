'use client';

import { useState, FormEvent } from 'react';
import { api } from '@/lib/axios';

interface LoginFormProps {
  onError: (message: string) => void;
}

export default function LoginForm({ onError }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    onError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;

        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        window.location.href = '/dashboard';
      } else {
        onError('Token tidak ditemukan dari server.');
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Terjadi kesalahan saat masuk. Silakan coba lagi.';
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Email atau ID Pengguna
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="nama@email.com"
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Kata Sandi
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition duration-200 text-sm shadow-md"
      >
        {isLoading ? 'Memproses...' : 'Login →'}
      </button>
    </form>
  );
}