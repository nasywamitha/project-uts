'use client';

import { useActionState } from 'react';
import { createCategoryAction, ActionState } from '../app/actions/category';
import { ChevronDown } from 'lucide-react';

const initialState: ActionState = {
  success: false,
  message: '',
};

export default function CategoryForm() {
  const [state, formAction, isPending] = useActionState(createCategoryAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-gray-800">Tambah Kategori Baru</h2>
        <p className="text-xs text-gray-400 mt-0.5">Masukkan nama dan tipe kategori keuangan.</p>
      </div>

      {/* Pesan Sukses / Error Umum */}
      {state.message && (
        <div className={`p-3 text-xs rounded-xl font-medium ${state.success ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
          {state.message}
        </div>
      )}

      {/* Input Nama Kategori */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-gray-700">Nama Kategori</label>
        <input
          type="text"
          name="name"
          placeholder="Contoh: Makanan, Transport"
          className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-gray-800 shadow-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        {state.errors?.name && (
          <p className="text-[11px] text-red-500 font-medium">{state.errors.name[0]}</p>
        )}
      </div>

      {/* Pilihan Tipe Kategori dengan Ikon Kustom */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-gray-700">Tipe Kategori</label>
        <div className="relative">
          <select
            name="type"
            defaultValue=""
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
        {state.errors?.type && (
          <p className="text-[11px] text-red-500 font-medium">{state.errors.type[0]}</p>
        )}
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