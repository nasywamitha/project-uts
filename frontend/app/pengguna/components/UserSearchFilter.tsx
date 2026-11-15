type Props = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: 'Semua' | 'Aktif' | 'Nonaktif';
  setStatusFilter: (status: 'Semua' | 'Aktif' | 'Nonaktif') => void;
};

export default function UserSearchFilter({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: Props) {
  const tabs: Array<'Semua' | 'Aktif' | 'Nonaktif'> = ['Semua', 'Aktif', 'Nonaktif'];

  return (
    <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Input Pencarian */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Cari nama atau email..."
        className="w-full sm:w-80 px-4 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
      />

      {/* Tombol Filter Tab Status */}
      <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100 self-start sm:self-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setStatusFilter(tab)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              statusFilter === tab
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}