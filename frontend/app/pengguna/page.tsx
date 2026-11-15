'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Plus } from 'lucide-react';
import { useUsers } from '@/hooks/useUsers';
import UserStatsCards from './components/UserStatsCards';
import UserTableSection from './components/UserTableSection';

export default function UsersPage() {
  const {
    users,
    stats,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    isLoading,
  } = useUsers();

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 bg-white">
        <Header />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Data Pengguna</h1>
            <p className="text-xs text-gray-400 mt-1">
              Kelola akun pengguna aplikasi dan status aksesibilitas secara terpusat.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 text-white font-semibold text-xs rounded-xl hover:bg-amber-600 transition w-full sm:w-auto">
              <Plus className="w-4 h-4" /> Tambah Pengguna
            </button>
          </div>
        </div>

        {/* Stats Cards Component */}
        <UserStatsCards stats={stats} />

        {/* Table Section Component */}
        <UserTableSection 
          users={users}
          isLoading={isLoading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
        />
      </main>
    </div>
  );
}