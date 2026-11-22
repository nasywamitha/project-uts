'use client';

export function logoutUser() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('token');
  localStorage.removeItem('user');

  // Hapus cookie token yang dipakai middleware FE
  document.cookie = 'token=; path=/; max-age=0; SameSite=Lax';

  // Arahkan kembali ke halaman login
  window.location.href = '/login';
}