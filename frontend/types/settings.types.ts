export interface AdminProfile {
  id: string;        // Contoh: "EMP-0000"
  name: string;      // Nama Lengkap
  email: string;     // Email SSO (akan terisi admin@uku.id)
  jabatan?: string;  // Jabatan (opsional)
  phone?: string;    // No. WhatsApp
  status: string;    // Contoh: "Aktif"
}

export interface UpdateProfilePayload {
  name: string;
  jabatan?: string;
  phone?: string;
}