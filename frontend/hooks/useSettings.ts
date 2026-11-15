 // frontend/hooks/useSettings.ts
import { useState, useEffect } from 'react';
// Sesuaikan path import dengan lokasi file service dan types di proyek Anda
import { settingsService } from '../services/settingService';
import { AdminProfile, UpdateProfilePayload } from '@/types/settings.types';

export function useSettings() {
  // 1. State untuk menyimpan data profil asli dari backend
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  
  // 2. State untuk status loading saat mengambil atau menyimpan data
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  
  // 3. State untuk pesan error atau notifikasi sukses
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fungsi untuk mengambil data profil admin yang sedang aktif login
  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await settingsService.getProfile();
      // Pastikan struktur response.data sesuai dengan format JSON dari backend Anda
      setProfile(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal memuat data profil admin');
    } finally {
      setIsLoading(false);
    }
  };

  // Jalankan fetchProfile otomatis saat halaman pengaturan pertama kali dibuka
  useEffect(() => {
    fetchProfile();
  }, []);

  // Fungsi untuk menyimpan perubahan data profil (Nama, Jabatan, No. WhatsApp)
  const updateProfile = async (updatedData: UpdateProfilePayload) => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    const payload: { name: string; jabatan: string; phone: string } = {
      name: updatedData.name ?? '',
      jabatan: updatedData.jabatan ?? '',
      phone: updatedData.phone ?? '',
    };

    try {
      const response = await settingsService.updateProfile(payload);
      setProfile(response.data); // Perbarui state lokal dengan data terbaru
      setSuccessMessage('Profil berhasil diperbarui!');
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal memperbarui profil');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Kembalikan state dan fungsi agar bisa dipakai di halaman / komponen UI
  return {
    profile,
    isLoading,
    isSaving,
    error,
    successMessage,
    updateProfile,
    refetchProfile: fetchProfile,
  };
}