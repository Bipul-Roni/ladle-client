import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import RecipeForm from './RecipeForm';

export default function UpdateModal({ recipe, onClose, onSave, saving }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:items-center" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="update-title"
        className="my-8 w-full max-w-3xl rounded-2xl bg-bg p-6 shadow-2xl sm:p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="update-title" className="text-2xl text-ink">Update recipe</h2>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5" aria-label="Close">
            <FiX size={20} />
          </button>
        </div>
        <RecipeForm initial={recipe} onSubmit={onSave} submitLabel="Save changes" submitting={saving} />
      </div>
    </div>
  );
}
