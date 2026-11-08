import { MoreVertical } from 'lucide-react';

export default function RecentUsersTable({ users }: { users: any[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <div>
          <h3 className="font-bold text-gray-800">Pengguna Terbaru</h3>
          <p className="text-xs text-gray-400">Akun yang baru terdaftar dalam 7 hari terakhir</p>
        </div>
        <button className="text-xs font-bold text-amber-600 hover:underline">Lihat Semua →</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs text-gray-400 uppercase font-semibold">
            <tr>
              <th className="p-3 rounded-l-xl">Nama</th>
              <th className="p-3">Email</th>
              <th className="p-3">Tanggal Daftar</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right rounded-r-xl">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/60">
                <td className="p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">{user.initials}</div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-400">ID: {user.id}</p>
                  </div>
                </td>
                <td className="p-3 text-gray-500">{user.email}</td>
                <td className="p-3 text-gray-500">{user.date}</td>
                <td className="p-3"><span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-xs font-medium">● {user.status}</span></td>
                <td className="p-3 text-right space-x-2">
                  <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700">Detail</button>
                  <button className="p-1 text-gray-400 hover:text-gray-600"><MoreVertical className="w-4 h-4 inline" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}