'use client';

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { api } from '@/lib/axios';

interface GoogleLoginButtonProps {
  onError: (message: string) => void;
}

export default function GoogleLoginButton({ onError }: GoogleLoginButtonProps) {
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    onError('');

    if (!credentialResponse.credential) {
      onError('Credential Google tidak ditemukan.');
      return;
    }

    try {
      const response = await api.post('/auth/google', {
        token: credentialResponse.credential,
      });

      const authToken = response.data.token;
      if (authToken) {
        localStorage.setItem('token', authToken);
        document.cookie = `token=${authToken}; path=/; max-age=86400; SameSite=Lax`;

        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        window.location.href = '/dashboard';
      } else {
        onError('Token tidak ditemukan dari server.');
      }
    } catch (err: any) {
      onError(err.response?.data?.message || 'Login dengan Google gagal.');
    }
  };

  return (
    <div className="w-full flex justify-center mb-4">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => onError('Gagal membuka atau memproses login Google.')}
      />
    </div>
  );
}