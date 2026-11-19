export type User = {
  id: string | number;
  no?: number;
  name?: string;
  nama?: string;
  email: string;
  status: 'Aktif' | 'Nonaktif';
  registerDate?: string;
  created_at?: string;
  initials?: string;
  avatarBg?: string;
};

export type UserStats = {
  totalTerdaftar?: number | string;
  penggunaAktif?: number | string;
  penggunaNonaktif?: number | string;
  pendaftarBulanIni?: number | string;
  total?: number | string;
  active?: number | string;
  inactive?: number | string;
  thisMonth?: number | string;
};

// Pastikan baris ini ada agar import { UsersResponse } tidak error
export type UsersResponse = {
  success: boolean;
  stats: UserStats;
  data: User[];
};