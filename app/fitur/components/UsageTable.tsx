'use client';

import { SlidersHorizontal, Receipt, PieChart as PieChartIcon, Wallet, PiggyBank, Bot } from 'lucide-react';

export default function UsageTable({ details }: { details: any[] }) {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'receipt': return <Receipt className="w-4 h-4" />;
      case 'pie-chart': return <PieChartIcon className="w-4 h-4" />;
      case 'wallet': return <Wallet className="w-4 h-4" />;
      case 'piggy': return <PiggyBank className="w-4 h-4" />;
      case 'bot': return <Bot className="w-4 h-4" />;
      default: return <Receipt className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <div>
          <h3 className="font-bold text-gray-800 text-sm">Rincian Pertumbuhan Fitur (Month over Month)</h3>
          <p className="text-xs text-gray-400 mt-0.5">Tingkat retensi, jam puncak operasional, dan pertumbuhan performa fitur</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filter Status
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-xs text-gray-600">
          <thead className="bg-gray-50 text-[11px] text-gray-400 uppercase font-semibold border-b border-gray-200">
            <tr>
              <th className="p-3 pl-4">NAMA FITUR</th>
              <th className="p-3">PENGGUNAAN</th>
              <th className="p-3 text-center pr-4">STATUS KINERJA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {details?.map((item: any) => (
              <tr key={item.id} className="hover:bg-gray-50/60">
                <td className="p-4 pl-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                      {renderIcon(item.iconType)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-xs">{item.name}</p>
                      <p className="text-[11px] text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-bold text-gray-800">{item.usage}</td>
                <td className="p-4 text-center pr-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold inline-block ${item.statusBg}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}