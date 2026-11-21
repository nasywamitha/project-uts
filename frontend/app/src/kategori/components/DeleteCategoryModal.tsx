'use client';

type Category = {
  id: string;
  name: string;
  icon: string;
  type: string;
};

interface DeleteModalProps {
  isOpen: boolean;
  category: Category | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteCategoryModal({ isOpen, category, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-gray-100 text-center space-y-4">
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto font-bold text-lg">
          !
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-base">Hapus Kategori</h3>
          <p className="text-xs text-gray-500 mt-1">
            Apakah Anda yakin ingin menghapus kategori <span className="font-semibold text-gray-700">"{category?.name}"</span> ini?
          </p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition cursor-pointer shadow-md shadow-red-500/20"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}