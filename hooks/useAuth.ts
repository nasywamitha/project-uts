'use client';

import { useState, useEffect, useCallback } from 'react';

export interface AuthUser {
  name: string;
  email: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);

  const syncUserFromStorage = useCallback(() => {
    try {
      let savedName = localStorage.getItem('userName') || '';
      let savedEmail = localStorage.getItem('userEmail') || '';
      let savedRole = localStorage.getItem('userRole') || '';

      const rawUser = localStorage.getItem('user');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        savedName = savedName || parsed?.name || parsed?.nama || '';
        savedEmail = savedEmail || parsed?.email || '';
        savedRole = savedRole || parsed?.role || '';
      }

      if (savedName) {
        setUser({
          name: savedName,
          email: savedEmail,
          role: savedRole || 'Admin',
        });
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    syncUserFromStorage();

    window.addEventListener('storage', syncUserFromStorage);
    window.addEventListener('auth-updated', syncUserFromStorage);

    return () => {
      window.removeEventListener('storage', syncUserFromStorage);
      window.removeEventListener('auth-updated', syncUserFromStorage);
    };
  }, [syncUserFromStorage]);

  return { user, refreshAuth: syncUserFromStorage };
}