'use client';

import { useState, FormEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import IconPicker from './IconPicker';

interface CategoryFormProps {
  onSuccess?: () => void;
}

const API_URL = 'http://localhost:5001/api/categories/web';

export default function CategoryForm({ onSuccess }: CategoryFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('utensils');
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !type) {
      setErrorMessage('Nama dan tipe kategori wajib diisi.');
      return;
    }

    setIsPending(true);
    try {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('token') || localStorage.getItem('accessToken')
          : null;

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: name.trim(),
          type,
          icon: selectedIcon || 'utensils',
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(data.message || 'Gagal menyimpan kategori.');
        return;
      }

      setName('');
      setType('');
      setSelectedIcon('utensils');
      onSuccess?.();
    } catch (err) {
      console.error('Error creating category:', err);
      setErrorMessage('Terjadi kesalahan saat menghubungi server.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-gray-800">Tambah Kategori Baru</h2>
        <p className="text-xs text-gray-400 mt-0.5">Masukkan nama, tipe, dan ikon kategori keuangan.</p>
      </div>

      {errorMessage && (
        <div className="p-3 text-xs rounded-xl font-medium bg-red-50 text-red-500">
          {errorMessage}
        </div>
      )}

      {/* Input Nama Kategori */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-gray-700">Nama Kategori</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Makanan, Transport"
          required
          className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-gray-800 shadow-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>

      {/* Pilihan Tipe Kategori */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-gray-700">Tipe Kategori</label>
        <div className="relative">
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 pr-10 text-xs text-gray-800 shadow-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white appearance-none cursor-pointer"
          >
            <option value="" disabled>Pilih Tipe Kategori</option>
            <option value="Pemasukan">Pemasukan</option>
            <option value="Pengeluaran">Pengeluaran</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Pilihan Ikon Kategori */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-gray-700">Ikon Kategori</label>
        <IconPicker value={selectedIcon} onChange={setSelectedIcon} />
      </div>

      {/* Tombol Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 focus:outline-none disabled:bg-gray-300 cursor-pointer transition shadow-xs shadow-amber-500/20"
      >
        {isPending ? 'Menyimpan...' : 'Simpan Kategori'}
      </button>
    </form>
  );
}