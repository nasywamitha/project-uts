import { TrendingUp } from 'lucide-react';

export default function StatCard({ title, value, growth, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex justify-between items-start">
      <div>
        <p className="text-[10px] font-bold text-gray-400 tracking-wider mb-1">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{value}</h2>
        <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> {growth} <span className="text-gray-400 font-normal">dari bulan lalu</span>
        </span>
      </div>
      <div className={`p-2.5 rounded-xl ${color}`}><Icon className="w-5 h-5" /></div>
    </div>
  );
}