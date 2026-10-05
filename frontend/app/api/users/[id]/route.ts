import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const userDetail = {
    id: id || 'USR-8831',
    name: 'Andi Pratama',
    email: 'andi@example.com',
    status: 'Aktif',
    registerDate: '12 Sep 2026',
    lastLogin: '20 Sep 2026, 14:32',
    joinedSince: 'Bergabung sejak 12 Sep 2026',
    activities: [
      { date: '20 Sep 2026, 14:32', action: 'Login', feature: '-', tagBg: '' },
      { date: '19 Sep 2026, 09:12', action: 'Menggunakan fitur Budget', feature: 'Budget', tagBg: 'bg-blue-50 text-blue-600' },
      { date: '18 Sep 2026, 16:45', action: 'Menggunakan fitur Catat Pengeluaran', feature: 'Catat Pengeluaran', tagBg: 'bg-amber-50 text-amber-600' },
      { date: '17 Sep 2026, 11:20', action: 'Menggunakan fitur Rekap Aktivitas', feature: 'Rekap Aktivitas', tagBg: 'bg-purple-50 text-purple-600' },
      { date: '16 Sep 2026, 20:10', action: 'Menggunakan fitur Nabung', feature: 'Nabung', tagBg: 'bg-emerald-50 text-emerald-600' },
    ],
  };

  return NextResponse.json({
    success: true,
    data: userDetail,
  });
}