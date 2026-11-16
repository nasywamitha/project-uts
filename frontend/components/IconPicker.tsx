'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { iconMap, iconKeywords, CategoryIcon } from '@/lib/iconMap';

interface IconPickerProps {
  value: string;
  onChange: (iconKey: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const [search, setSearch] = useState('');

  const iconEntries = Object.entries(iconMap).filter(([key]) => {
    const keywords = iconKeywords[key] || key;
    const query = search.toLowerCase();
    return (
      keywords.toLowerCase().includes(query) ||
      key.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-2">
      {/* Pencarian & Preview Ikon Terpilih */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ikon (cth: gaji, kopi, listrik, makan)..."
            className="w-full pl-8 pr-3 py-2 text-xs text-gray-800 border border-gray-200 rounded-xl shadow-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {value && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 shrink-0">
            <CategoryIcon name={value} className="w-4 h-4" />
            <span className="text-[11px] font-semibold">Terpilih</span>
          </div>
        )}
      </div>

      {/* Grid Ikon Library */}
      <div className="grid grid-cols-6 gap-2 max-h-44 overflow-y-auto p-2 border border-gray-200 rounded-xl bg-gray-50/60">
        {iconEntries.length > 0 ? (
          iconEntries.map(([key, IconComponent]) => {
            const isSelected = value === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => onChange(key)}
                title={iconKeywords[key] || key}
                className={`aspect-square flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-600'
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </button>
            );
          })
        ) : (
          <div className="col-span-6 py-4 text-center text-[11px] text-gray-400">
            Ikon &quot;{search}&quot; tidak ditemukan
          </div>
        )}
      </div>
    </div>
  );
}