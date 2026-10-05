import { NextResponse } from 'next/server';

export async function GET() {
  // Data dummy yang menyesuaikan tampilan gambar UI Anda
  const dashboardData = {
    stats: {
      totalPengguna: 1250,
      totalPenggunaGrowth: '+12%',
      penggunaAktif: 980,
      penggunaAktifGrowth: '+8%',
      penggunaBaru: 35,
      penggunaBaruGrowth: '+20%',
      totalAktivitas: 8430,
      totalAktivitasGrowth: '+15%',
    },
    chartAktivitas: [
      { month: 'Jan', value: 200 },
      { month: 'Feb', value: 300 },
      { month: 'Mar', value: 420 },
      { month: 'Apr', value: 400 },
      { month: 'Mei', value: 550 },
      { month: 'Jun', value: 500 },
      { month: 'Jul', value: 620 },
      { month: 'Agu', value: 580 },
      { month: 'Sep', value: 720 },
      { month: 'Okt', value: 890 },
      { month: 'Nov', value: 1000 },
      { month: 'Des', value: 970 },
    ],
    penggunaanFitur: [
      { name: 'Catat Pengeluaran', percentage: 28, color: '#f59e0b' },
      { name: 'Budget', percentage: 20, color: '#3b82f6' },
      { name: 'Rekap Aktivitas', percentage: 18, color: '#6366f1' },
      { name: 'Nabung', percentage: 15, color: '#60a5fa' },
      { name: 'AI Notifikasi', percentage: 12, color: '#a855f7' },
      { name: 'Lainnya', percentage: 7, color: '#9ca3af' },
    ],
    recentUsers: [
      { id: 'USR-8831', initials: 'SR', name: 'Siti Rahma', email: 'siti@email.com', date: '20 Sep 2026', status: 'Aktif' },
      { id: 'USR-8830', initials: 'BS', name: 'Budi Santoso', email: 'budi@email.com', date: '19 Sep 2026', status: 'Aktif' },
      { id: 'USR-8829', initials: 'DL', name: 'Dewi Lestari', email: 'dewi@email.com', date: '18 Sep 2026', status: 'Aktif' },
      { id: 'USR-8828', initials: 'AD', name: 'Anisa Dwi Ariyanti', email: 'anisa.dwi@example.com', date: '17 Sep 2026', status: 'Aktif' },
    ],
  };

  return NextResponse.json({ success: true, data: dashboardData });
}