import Link from 'next/link';

type Props = {
  users: Array<{
    id: string | number;
    name: string;
    email: string;
    registerDate: string;
    status: 'Aktif' | 'Nonaktif';
  }>;
};

export default function RecentUsersTable({ users }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-5 mt-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-bold text-gray-800">Pengguna Terbaru</h3>
          <p className="text-[11px] text-gray-400">Akun yang baru terdaftar dalam 7 hari terakhir</p>
        </div>
        <Link href="/pengguna" className="text-xs font-semibold text-amber-500 hover:underline">
          Lihat Semua →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-xs text-gray-600">
          <thead className="bg-gray-50 text-[11px] text-gray-400 uppercase font-semibold border-b border-gray-200">
            <tr>
              <th className="p-3">NAMA</th>
              <th className="p-3">EMAIL</th>
              <th className="p-3">TANGGAL DAFTAR</th>
              <th className="p-3 text-center">STATUS</th>
              <th className="p-3 text-right pr-4">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(!users || users.length === 0) ? (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-400">Belum ada pengguna terbaru.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/60">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                        {user.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 block">{user.name}</span>
                        <span className="text-[10px] text-gray-400">ID: USR-{user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{user.email}</td>
                  <td className="p-4 text-gray-500">{user.registerDate}</td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full text-[11px] font-semibold inline-block bg-emerald-100/70 text-emerald-600">
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-4">
                    <Link
                      href={`/pengguna/${user.id}`}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold inline-block transition"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}