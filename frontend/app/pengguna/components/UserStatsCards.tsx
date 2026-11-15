import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';

type Props = {
  stats: {
    total?: number | string;
    active?: number | string;
    inactive?: number | string;
    thisMonth?: number | string;
    totalTerdaftar?: number | string;
    penggunaAktif?: number | string;
    penggunaNonaktif?: number | string;
    pendaftarBulanIni?: number | string;
  };
};

export default function UserStatsCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">TOTAL TERDAFTAR</p>
          <h2 className="text-2xl font-bold text-gray-800">{stats.total || stats.totalTerdaftar || '0'}</h2>
        </div>
        <div className="p-2.5 bg-indigo-50 text-indigo-500 rounded-xl"><Users className="w-5 h-5" /></div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">PENGGUNA AKTIF</p>
          <h2 className="text-2xl font-bold text-emerald-600">{stats.active || stats.penggunaAktif || '0'}</h2>
        </div>
        <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl"><UserCheck className="w-5 h-5" /></div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">PENGGUNA NONAKTIF</p>
          <h2 className="text-2xl font-bold text-red-500">{stats.inactive || stats.penggunaNonaktif || '0'}</h2>
        </div>
        <div className="p-2.5 bg-red-50 text-red-500 rounded-xl"><UserX className="w-5 h-5" /></div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">PENDAFTAR BULAN INI</p>
          <h2 className="text-2xl font-bold text-amber-500">{stats.thisMonth || stats.pendaftarBulanIni || '+0'}</h2>
        </div>
        <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl"><UserPlus className="w-5 h-5" /></div>
      </div>
    </div>
  );
}