'use client';

import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    // Ambil data user dari localStorage setelah login
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    const savedRole = localStorage.getItem('userRole');

    if (savedName) {
      setUser({
        name: savedName,
        email: savedEmail || '',
        role: savedRole || 'Admin',
      });
    }
  }, []);

  return { user };
}