import { Calendar, Download } from 'lucide-react';

export default function UsageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Statistik Penggunaan Fitur</h1>
        <p className="text-xs text-gray-400 mt-1">Lihat seberapa sering fitur aplikasi digunakan oleh pengguna.</p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button className="flex items-center justify-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50">
          <Calendar className="w-4 h-4 text-amber-500" /> 1 Sep 2026 - 30 Sep 2026
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50">
          <Download className="w-4 h-4" /> Ekspor
        </button>
      </div>
    </div>
  );
}