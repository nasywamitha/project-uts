import Link from 'next/link';
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { User } from '@/types/user';

type Props = {
  users: User[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filter: 'Semua' | 'Aktif' | 'Nonaktif';
  setFilter: (val: 'Semua' | 'Aktif' | 'Nonaktif') => void;
};

export default function UserTableSection({
  users,
  isLoading,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-5">
      {/* Table Controls */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
        <div className="relative w-full lg:max-w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {(['Semua', 'Aktif', 'Nonaktif'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  filter === tab ? 'bg-white text-gray-800 shadow-xs' : 'text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100">
            <ArrowUpDown className="w-3.5 h-3.5" /> Urutkan
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-xs text-gray-600">
          <thead className="bg-gray-50 text-[11px] text-gray-400 uppercase font-semibold border-b border-gray-200">
            <tr>
              <th className="p-3 pl-4">NO</th>
              <th className="p-3">NAMA</th>
              <th className="p-3">EMAIL</th>
              <th className="p-3 text-center">STATUS</th>
              <th className="p-3">TANGGAL DAFTAR</th>
              <th className="p-3 text-right pr-4">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-400">Memuat data pengguna...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-6 text-gray-400">Belum ada data pengguna.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50/60">
                  <td className="p-4 pl-4 text-gray-400">{index + 1}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${user.avatarBg}`}>
                        {user.initials}
                      </div>
                      <span className="font-bold text-gray-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{user.email}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold inline-block ${
                      user.status === 'Aktif' ? 'bg-emerald-100/70 text-emerald-600' : 'bg-red-100/70 text-red-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{user.registerDate}</td>
                  <td className="p-4 text-right pr-4 space-x-2">
                    <Link
                      href={`/pengguna/${user.id}`}
                      className="px-3 py-1 bg-amber-500 text-white hover:bg-amber-600 rounded-lg text-xs font-semibold inline-block transition"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400">
        <p>Menampilkan 1 hingga {users.length} dari total akun</p>
        <div className="flex items-center gap-2 font-semibold">
          <button className="p-1 text-gray-300"><ChevronLeft className="w-4 h-4" /></button>
          <button className="w-7 h-7 bg-amber-500 text-white rounded-lg flex items-center justify-center">1</button>
          <button className="w-7 h-7 hover:bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">2</button>
          <button className="w-7 h-7 hover:bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">3</button>
          <span>...</span>
          <button className="p-1 text-gray-600"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
}