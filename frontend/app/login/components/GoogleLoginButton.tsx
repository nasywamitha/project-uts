'use client';

import { GoogleLogin } from '@react-oauth/google';
import { api } from '@/lib/axios';

interface GoogleLoginButtonProps {
  onError: (message: string) => void;
}

export default function GoogleLoginButton({ onError }: GoogleLoginButtonProps) {
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      onError('');
      // Kirim token google ke backend Anda
      const response = await api.post('/auth/google', {
        token: credentialResponse.credential,
      });

      if (response.data.success) {
        const token = response.data.token || response.data.data?.token;

        if (token) {
          localStorage.setItem('token', token);
          document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
        }

        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        window.location.href = '/dashboard';
      } else {
        onError(response.data.message || 'Login Google gagal.');
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Gagal login dengan Google.';
      onError(msg);
    }
  };

  return (
    <div className="w-full flex justify-center mb-6">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          onError('Autentikasi Google gagal. Silakan coba lagi.');
        }}
        useOneTap
      />
    </div>
  );
}