'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { settingsService, AdminAccessItem } from '@/services/settingsService';

interface RoleAccessTabProps {
  roles?: AdminAccessItem[];
  onRefresh?: () => Promise<void> | void;
}

export default function RoleAccessTab({ roles = [], onRefresh }: RoleAccessTabProps) {
  const [items, setItems] = useState<AdminAccessItem[]>(roles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // State modal Edit Jabatan (role tetap 'Admin')
  const [editingAdmin, setEditingAdmin] = useState<AdminAccessItem | null>(null);
  const [jabatanInput, setJabatanInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // State modal Tambah Admin (role otomatis 'Admin')
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    jabatan: '',
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (roles && roles.length > 0) {
      setItems(roles);
    }
  }, [roles]);

  const loadAdmins = async () => {
    setIsLoading(true);
    try {
      const data = await settingsService.getAdmins();
      setItems(data);
    } catch (error) {
      console.error('Gagal memuat daftar admin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!roles || roles.length === 0) {
      loadAdmins();
    }
  }, []);

  const filteredRoles = items.filter((item) => {
    const q = searchTerm.toLowerCase();
    const roleText = (item.role || 'Admin').toLowerCase();
    return (
      (item.name || '').toLowerCase().includes(q) ||
      (item.email || '').toLowerCase().includes(q) ||
      (item.jabatan || '').toLowerCase().includes(q) ||
      roleText.includes(q)
    );
  });

  const handleOpenEdit = (admin: AdminAccessItem) => {
    setEditingAdmin(admin);
    setJabatanInput(admin.jabatan || '');
  };

  const handleSaveJabatan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdmin) return;

    setIsSaving(true);
    try {
      await settingsService.updateAdminJabatan(editingAdmin.id, {
        jabatan: jabatanInput.trim(),
      });

      setItems((prev) =>
        prev.map((row) =>
          row.id === editingAdmin.id
            ? { ...row, jabatan: jabatanInput.trim(), role: 'Admin' }
            : row
        )
      );

      if (onRefresh) {
        await onRefresh();
      }

      setEditingAdmin(null);
      alert('Jabatan admin berhasil diperbarui!');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Gagal memperbarui jabatan admin.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      await settingsService.createAdmin({
        name: newAdmin.name.trim(),
        email: newAdmin.email.trim(),
        password: newAdmin.password,
        jabatan: newAdmin.jabatan.trim(),
      });

      setNewAdmin({ name: '', email: '', password: '', jabatan: '' });
      setIsAddOpen(false);
      await loadAdmins();
      if (onRefresh) {
        await onRefresh();
      }
      alert('Admin baru berhasil ditambahkan!');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Gagal menambahkan admin baru.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
      {/* Header Tabel: Search & Tombol Tambah */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari admin/jabatan/role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-amber-500 text-gray-800"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Tambah Admin
        </button>
      </div>

      {/* Tabel Data Role */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-[11px] text-gray-400 uppercase font-semibold border-b border-gray-100">
            <tr>
              <th className="p-3">ADMIN</th>
              <th className="p-3">JABATAN</th>
              <th className="p-3">ROLE</th>
              <th className="p-3 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  Memuat data role admin...
                </td>
              </tr>
            ) : filteredRoles.length > 0 ? (
              filteredRoles.map((admin) => (
                <tr key={admin.id || admin.email} className="hover:bg-gray-50/50 transition">
                  <td className="p-3 font-bold text-gray-800">
                    {admin.name}
                    <br />
                    <span className="text-[10px] font-normal text-gray-400">{admin.email}</span>
                  </td>
                  <td className="p-3 text-gray-600">{admin.jabatan || '-'}</td>
                  <td className="p-3">
                    <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-bold text-[10px]">
                      Admin
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(admin)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  {items.length > 0 ? 'Tidak ditemukan data yang cocok.' : 'Belum ada data admin.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Edit Jabatan (Role selalu Admin) */}
      {editingAdmin && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveJabatan}
            className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-md space-y-4 text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-sm">Edit Jabatan Admin</h3>
              <button
                type="button"
                onClick={() => setEditingAdmin(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Admin</label>
              <input
                type="text"
                value={`${editingAdmin.name} (${editingAdmin.email})`}
                disabled
                className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value="Admin"
                disabled
                className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Jabatan</label>
              <input
                type="text"
                value={jabatanInput}
                onChange={(e) => setJabatanInput(e.target.value)}
                placeholder="Contoh: Kepala Operasional / Admin Keuangan"
                maxLength={100}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 text-gray-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingAdmin(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl cursor-pointer disabled:opacity-50"
              >
                {isSaving ? 'Menyimpan...' : 'Simpan Jabatan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Tambah Admin (Role otomatis Admin) */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateAdmin}
            className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-md space-y-3 text-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-sm">Tambah Admin Baru</h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={newAdmin.name}
                onChange={(e) => setNewAdmin((p) => ({ ...p, name: e.target.value }))}
                placeholder="Masukkan nama admin"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={newAdmin.email}
                onChange={(e) => setNewAdmin((p) => ({ ...p, email: e.target.value }))}
                placeholder="admin@email.com"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Jabatan</label>
              <input
                type="text"
                value={newAdmin.jabatan}
                onChange={(e) => setNewAdmin((p) => ({ ...p, jabatan: e.target.value }))}
                placeholder="Contoh: Admin Sistem"
                maxLength={100}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Password Awal</label>
              <input
                type="password"
                required
                value={newAdmin.password}
                onChange={(e) => setNewAdmin((p) => ({ ...p, password: e.target.value }))}
                placeholder="Min. 8 karakter, huruf besar & kecil"
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-500 text-gray-800"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value="Admin"
                disabled
                className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl cursor-pointer disabled:opacity-50"
              >
                {isCreating ? 'Menyimpan...' : 'Simpan Admin'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}