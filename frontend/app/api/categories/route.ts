import { NextResponse } from 'next/server';

const categoriesData = [
  // --- Kategori Pengeluaran ---
  { id: '1', name: 'Makanan', icon: 'utensils', type: 'Pengeluaran' },
  { id: '2', name: 'Transportasi', icon: 'car', type: 'Pengeluaran' },
  { id: '3', name: 'Belanja', icon: 'shopping-bag', type: 'Pengeluaran' },
  { id: '4', name: 'Pendidikan', icon: 'graduation-cap', type: 'Pengeluaran' },
  { id: '5', name: 'Pakaian', icon: 'shirt', type: 'Pengeluaran' },
  { id: '6', name: 'Donasi', icon: 'heart', type: 'Pengeluaran' },
  { id: '7', name: 'Hiburan', icon: 'glasses', type: 'Pengeluaran' },
  { id: '8', name: 'Kebutuhan Rumah', icon: 'home', type: 'Pengeluaran' },
  { id: '9', name: 'Kecantikan', icon: 'sparkles', type: 'Pengeluaran' },
  { id: '10', name: 'Hewan Peliharaan', icon: 'paw-print', type: 'Pengeluaran' },
  { id: '11', name: 'Liburan', icon: 'plane', type: 'Pengeluaran' },
  { id: '12', name: 'Kesehatan', icon: 'bed', type: 'Pengeluaran' },

  // --- Kategori Pemasukan ---
  { id: '13', name: 'Makanan', icon: 'utensils', type: 'Pemasukan' },
  { id: '14', name: 'Transportasi', icon: 'car', type: 'Pemasukan' },
  { id: '15', name: 'Belanja', icon: 'shopping-bag', type: 'Pemasukan' },
  { id: '16', name: 'Pendidikan', icon: 'graduation-cap', type: 'Pemasukan' },
  { id: '17', name: 'Pakaian', icon: 'shirt', type: 'Pemasukan' },
  { id: '18', name: 'Donasi', icon: 'heart', type: 'Pemasukan' },
  { id: '19', name: 'Hiburan', icon: 'glasses', type: 'Pemasukan' },
  { id: '20', name: 'Kebutuhan Rumah', icon: 'home', type: 'Pemasukan' },
  { id: '21', name: 'Kecantikan', icon: 'sparkles', type: 'Pemasukan' },
  { id: '22', name: 'Hewan Peliharaan', icon: 'paw-print', type: 'Pemasukan' },
  { id: '23', name: 'Liburan', icon: 'plane', type: 'Pemasukan' },
  { id: '24', name: 'Kesehatan', icon: 'bed', type: 'Pemasukan' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  let result = categoriesData;
  if (type) {
    result = categoriesData.filter(
      (cat) => cat.type.toLowerCase() === type.toLowerCase()
    );
  }

  return NextResponse.json({ success: true, data: result });
}