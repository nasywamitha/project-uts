'use client';

import { useState, useEffect, FormEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import IconPicker from './IconPicker';

type Category = {
  id: string;
  name: string;
  icon: string;
  type: string;
};

interface EditCategoryModalProps {
  isOpen: boolean;
  category: Category | null;
  onClose: () => void;
  onSuccess: () => void;
}

const API_BASE_URL = 'http://localhost:5001/api/categories/web';

export default function EditCategoryModal({
  isOpen,
  category,
  onClose,
  onSuccess,
}: EditCategoryModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Pengeluaran');
  const [selectedIcon, setSelectedIcon] = useState('utensils');
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name || '');
      setType(category.type || 'Pengeluaran');
      setSelectedIcon(category.icon || 'utensils');
      setErrorMessage('');
    }
  }, [category]);

  if (!isOpen || !category) return null;

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

      const res = await fetch(`${API_BASE_URL}/${category.id}`, {
        method: 'PUT',
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
        setErrorMessage(data.message || 'Gagal memperbarui kategori.');
        return;
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error updating category:', err);
      setErrorMessage('Terjadi kesalahan saat menghubungi server.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-100 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold cursor-pointer"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-gray-800">Edit Kategori</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Perbarui nama, tipe, atau ikon kategori keuangan.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 text-xs rounded-xl font-medium bg-red-50 text-red-500">
              {errorMessage}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700">Nama Kategori</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-gray-800 shadow-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

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
                <option value="Pengeluaran">Pengeluaran</option>
                <option value="Pemasukan">Pemasukan</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700">Ikon Kategori</label>
            <IconPicker value={selectedIcon} onChange={setSelectedIcon} />
          </div>

          <div className="flex gap-2.5 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 cursor-pointer transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 focus:outline-none disabled:bg-gray-300 cursor-pointer transition shadow-xs shadow-amber-500/20"
            >
              {isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}