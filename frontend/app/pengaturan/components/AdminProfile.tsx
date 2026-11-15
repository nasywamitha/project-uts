'use client';

export default function AdminProfileTab({ profile, setProfile, handleSave, isSaving }: any) {
  if (!profile || Object.keys(profile).length === 0) {
    return <div className="p-8 text-center text-gray-400 text-xs">Memuat data profil akun aktif...</div>;
  }

  return (
    <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-gray-200 rounded-2xl p-6">
      {/* Kolom Kiri: Foto & Info Singkat */}
      <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-6">
        <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center text-indigo-700 font-bold text-2xl items-center justify-center overflow-hidden mb-3 border-2 border-amber-500">
          {profile.name ? profile.name.charAt(0) : 'A'}
        </div>
        <h3 className="font-bold text-gray-800 text-sm">{profile.name || 'Admin'}</h3>
        <p className="text-xs text-gray-400">{profile.email}</p>
        
        <div className="w-full mt-6 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-400">ID:</span>
            <span className="font-bold text-gray-800">{profile.empId || 'EMP-0000'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">STATUS:</span>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{profile.status || 'Aktif'}</span>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Input Form Data Pribadi */}
      <div className="lg:col-span-8 space-y-4">
        <h3 className="font-bold text-gray-800 text-sm mb-2">Informasi Data Pribadi</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-gray-500 mb-1">Nama Lengkap</label>
            <input 
              type="text" 
              value={profile.name || ''} 
              onChange={(e) => setProfile({...profile, name: e.target.value})}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium" 
            />
          </div>
          <div>
            <label className="block text-gray-500 mb-1">Jabatan</label>
            <input 
              type="text" 
              value={profile.jabatan || ''} 
              onChange={(e) => setProfile({...profile, jabatan: e.target.value})}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium" 
            />
          </div>
          <div>
            <label className="block text-gray-500 mb-1">Email SSO</label>
            <input 
              type="email" 
              disabled 
              value={profile.email || ''} 
              className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" 
            />
          </div>
          <div>
            <label className="block text-gray-500 mb-1">No. WhatsApp</label>
            <input 
              type="text" 
              value={profile.phone || ''} 
              onChange={(e) => setProfile({...profile, phone: e.target.value})}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 font-medium" 
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button type="button" className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600">Batal</button>
          <button type="submit" disabled={isSaving} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold">
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </form>
  );
}