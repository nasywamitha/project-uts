import { useState, useEffect, useMemo } from 'react';
import { User, UserStats } from '@/types/user';
import { userService } from '@/services/userService';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    active: 0,
    inactive: 0,
    thisMonth: 0,
  });
  const [filter, setFilter] = useState<'Semua' | 'Aktif' | 'Nonaktif'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userService.getAllUsers()
      .then((resData) => {
        const formattedData = (resData.data || []).map((item: any, index: number) => ({
          id: item.id,
          no: index + 1,
          name: item.nama || item.name || 'Tanpa Nama',
          email: item.email || '-',
          status: item.status || 'Aktif',
          registerDate: item.created_at 
            ? new Date(item.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
            : '-',
          initials: (item.nama || item.name || 'U').substring(0, 2).toUpperCase(),
          avatarBg: 'bg-amber-100 text-amber-700',
        }));

        setUsers(formattedData);
        
        // Ambil data statistik dari backend, jika tidak ada/kosong set ke 0
        if (resData.stats) {
          setStats({
            total: resData.stats.totalTerdaftar ?? resData.stats.total ?? 0,
            active: resData.stats.penggunaAktif ?? resData.stats.active ?? 0,
            inactive: resData.stats.penggunaNonaktif ?? resData.stats.inactive ?? 0,
            thisMonth: `+${resData.stats.pendaftarBulanIni ?? 0}`,
          });
        }
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        // Jika gagal koneksi/backend kosong, set statistik jadi 0
        setStats({ total: 0, active: 0, inactive: 0, thisMonth: '+0' });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesFilter = filter === 'Semua' ? true : u.status === filter;
      const matchesSearch = 
        (u.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (u.email || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [users, filter, searchQuery]);

  return {
    users: filteredUsers,
    stats,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    isLoading,
  };
}