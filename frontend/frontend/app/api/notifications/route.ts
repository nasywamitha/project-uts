import { NextResponse } from 'next/server';

const notificationsData = [
  {
    id: '#001',
    pesan: 'Peringat: Jangan lupa catat pengeluaran hari ini!',
    type: 'AI',
    iconType: 'bell',
    tanggal: '20 Sep 2026',
    status: 'Aktif',
  },
  {
    id: '#002',
    pesan: 'Fitur baru: Rekap Keuangan Bulanan telah tersedia.',
    type: 'Sistem',
    iconType: 'megaphone',
    tanggal: '18 Sep 2026',
    status: 'Aktif',
  },
  {
    id: '#003',
    pesan: 'Ayo tetap jaga kesehatan finansial kamu!',
    type: 'AI',
    iconType: 'heart',
    tanggal: '15 Sep 2026',
    status: 'Aktif',
  },
  {
    id: '#004',
    pesan: 'Terima kasih telah menggunakan aplikasi kami!',
    type: 'Sistem',
    iconType: 'tag',
    tanggal: '10 Sep 2026',
    status: 'Aktif',
  },
  {
    id: '#005',
    pesan: 'Pengingat Limit: Pengeluaran kategori Makanan & Minuman sudah mencapai 85%.',
    type: 'AI',
    iconType: 'alert',
    tanggal: '08 Sep 2026',
    status: 'Aktif',
  },
  {
    id: '#006',
    pesan: 'Tips Hemat: Terapkan metode budgeting 50/30/20 bulan ini.',
    type: 'Edukasi',
    iconType: 'lightbulb',
    tanggal: '01 Sep 2026',
    status: 'Nonaktif',
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: notificationsData,
    total: 24,
  });
}