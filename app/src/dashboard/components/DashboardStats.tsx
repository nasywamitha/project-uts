import { Users, UserCheck, UserPlus, Activity } from 'lucide-react';

export type DashboardStatsData = {
  totalPengguna?: number | string | null;
  penggunaAktif?: number | string | null;
  penggunaBaru?: number | string | null;
  totalAktivitas?: number | string | null;
};

type Props = {
  stats?: DashboardStatsData | null;
};

export default function DashboardStats({ stats }: Props) {
  const {
    totalPengguna = 0,
    penggunaAktif = 0,
    penggunaBaru = 0,
    totalAktivitas = 0,
  } = stats ?? {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">TOTAL PENGGUNA</p>
          <h2 className="text-2xl font-bold text-gray-800">{totalPengguna ?? 0}</h2>
          <p className="text-[10px] text-emerald-500 font-semibold mt-1">↗ +12% dari bulan lalu</p>
        </div>
        <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl">
          <Users className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">PENGGUNA AKTIF</p>
          <h2 className="text-2xl font-bold text-gray-800">{penggunaAktif ?? 0}</h2>
          <p className="text-[10px] text-emerald-500 font-semibold mt-1">↗ +8% dari bulan lalu</p>
        </div>
        <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl">
          <UserCheck className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">PENGGUNA BARU</p>
          <h2 className="text-2xl font-bold text-gray-800">{penggunaBaru ?? 0}</h2>
          <p className="text-[10px] text-emerald-500 font-semibold mt-1">↗ +20% dari bulan lalu</p>
        </div>
        <div className="p-2.5 bg-indigo-50 text-indigo-500 rounded-xl">
          <UserPlus className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">TOTAL AKTIVITAS</p>
          <h2 className="text-2xl font-bold text-gray-800">{totalAktivitas ?? 0}</h2>
          <p className="text-[10px] text-emerald-500 font-semibold mt-1">↗ +15% dari bulan lalu</p>
        </div>
        <div className="p-2.5 bg-purple-50 text-purple-500 rounded-xl">
          <Activity className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}