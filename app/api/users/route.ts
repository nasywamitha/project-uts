import { NextResponse } from 'next/server';

export async function GET() {
  const users = [
    { id: 'USR-8831', no: 1, name: 'Andi Pratama', email: 'andi@example.com', initials: 'AP', avatarBg: 'bg-indigo-100 text-indigo-600', status: 'Aktif', registerDate: '12 Sep 2026' },
    { id: 'USR-8830', no: 2, name: 'Sinta Dewi', email: 'sinta@example.com', initials: 'SD', avatarBg: 'bg-amber-100 text-amber-600', status: 'Aktif', registerDate: '15 Sep 2026' },
    { id: 'USR-8829', no: 3, name: 'Rizky Maulana', email: 'rizky@example.com', initials: 'RM', avatarBg: 'bg-blue-100 text-blue-600', status: 'Aktif', registerDate: '16 Sep 2026' },
    { id: 'USR-8828', no: 4, name: 'Putri Anggraini', email: 'putri@example.com', initials: 'PA', avatarBg: 'bg-purple-100 text-purple-600', status: 'Aktif', registerDate: '17 Sep 2026' },
    { id: 'USR-8827', no: 5, name: 'Fajar Nugroho', email: 'fajar@example.com', initials: 'FN', avatarBg: 'bg-rose-100 text-rose-600', status: 'Nonaktif', registerDate: '10 Sep 2026' },
    { id: 'USR-8826', no: 6, name: 'Nadia Kurnia', email: 'nadia@example.com', initials: 'NK', avatarBg: 'bg-emerald-100 text-emerald-600', status: 'Aktif', registerDate: '18 Sep 2026' },
    { id: 'USR-8825', no: 7, name: 'Yoga Pratama', email: 'yoga@example.com', initials: 'YP', avatarBg: 'bg-cyan-100 text-cyan-600', status: 'Aktif', registerDate: '14 Sep 2026' },
    { id: 'USR-8824', no: 8, name: 'Dinda Sari', email: 'dinda@example.com', initials: 'DS', avatarBg: 'bg-amber-100 text-amber-600', status: 'Aktif', registerDate: '13 Sep 2026' },
  ];

  return NextResponse.json({
    success: true,
    stats: {
      total: '1.250',
      active: '1.192',
      inactive: '58',
      thisMonth: '+148',
    },
    data: users,
  });
}