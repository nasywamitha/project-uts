'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { 
  ArrowLeft, Ban, User, Edit3, CheckCircle2, ArrowRight, Download 
} from 'lucide-react';

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const [userId, setUserId] = useState<string>('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setUserId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!userId) return;
    
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((resData) => setUser(resData.data))
      .catch((err) => console.error("Gagal memuat data user:", err));
  }, [userId]);

  if (!user) {
    return (
      <div className="flex min-h-screen bg-white text-gray-800">
        <Sidebar />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 bg-white">
          <p>Memuat data pengguna...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white text-gray-800">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 bg-white">
        {/* Back Link */}
        <Link href="/pengguna" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 mb-4 font-medium">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>

        {/* Header Title & Actions */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Detail Pengguna</h1>
            <p className="text-xs text-gray-400 mt-1">Rincian profil, sinkronisasi alokasi mobile app, dan log aktivitas pengguna.</p>
          </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-semibold text-xs rounded-xl hover:bg-gray-50">
                <Download className="w-4 h-4" /> Ekspor PDF
              </button>
              <button className="flex w-full sm:w-auto justify-center items-center gap-2 px-4 py-2 bg-red-50 text-red-500 font-semibold text-xs rounded-xl hover:bg-red-100">
                <Ban className="w-4 h-4" /> Bekukan Akun
              </button>
            </div>
          </div>

        {/* Top Section: Avatar Card & User Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Avatar Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-xs">
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
                <User className="w-12 h-12" />
              </div>
              <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-white absolute bottom-0 right-0" />
            </div>

            <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
            <p className="text-xs text-gray-400 mb-3">{user.email}</p>

            <span className="bg-emerald-100 text-emerald-600 text-xs font-semibold px-4 py-1 rounded-full mb-4">
              {user.status}
            </span>

            <button className="flex items-center gap-2 px-6 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 w-full justify-center mb-4">
              <Edit3 className="w-3.5 h-3.5 text-amber-500" /> Ubah Status
            </button>

            <p className="text-[11px] text-gray-400">{user.joinedSince}</p>
          </div>

          {/* Account Details Card */}
          <div className="min-w-0 lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-sm">Informasi Akun</h3>
                <span className="text-xs text-gray-400 font-mono">ID: {user.id}</span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,2fr)] gap-2">
                  <span className="text-gray-400">Nama Lengkap</span>
                  <span className="text-gray-400">:</span>
                  <span className="font-bold text-gray-800 break-words">{user.name}</span>
                </div>

                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,2fr)] gap-2">
                  <span className="text-gray-400">Email</span>
                  <span className="text-gray-400">:</span>
                  <span className="font-bold text-gray-800 break-all">{user.email}</span>
                </div>

                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,2fr)] gap-2 items-center">
                  <span className="text-gray-400">Status</span>
                  <span className="text-gray-400">:</span>
                  <span>
                    <span className="bg-emerald-100 text-emerald-600 px-2.5 py-0.5 rounded-md font-semibold text-[11px] inline-block">
                      {user.status}
                    </span>
                  </span>
                </div>

                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,2fr)] gap-2">
                  <span className="text-gray-400">Tanggal Daftar</span>
                  <span className="text-gray-400">:</span>
                  <span className="font-medium text-gray-700">{user.registerDate}</span>
                </div>

                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,2fr)] gap-2">
                  <span className="text-gray-400">Terakhir Login</span>
                  <span className="text-gray-400">:</span>
                  <span className="font-bold text-gray-800">{user.lastLogin}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Activity Log */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="font-bold text-gray-800 text-sm">Riwayat Aktivitas</h3>
            <p className="text-xs text-gray-400 mt-0.5">Aktivitas pengguna di aplikasi (tanpa detail keuangan)</p>
          </div>

          <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-[11px] text-gray-400 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="p-3 pl-4">TANGGAL</th>
                <th className="p-3">AKSI</th>
                <th className="p-3">FITUR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {user.activities?.map((act: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50/60">
                  <td className="p-4 pl-4 text-gray-500 font-medium">{act.date}</td>
                  <td className="p-4 font-bold text-gray-800">{act.action}</td>
                  <td className="p-4">
                    {act.feature !== '-' ? (
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold inline-block ${act.tagBg}`}>
                        {act.feature}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400">
            <p>Menampilkan 5 aktivitas terbaru dari audit log.</p>
            <button className="text-amber-600 font-bold hover:underline flex items-center gap-1">
              Lihat Semua Riwayat <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}