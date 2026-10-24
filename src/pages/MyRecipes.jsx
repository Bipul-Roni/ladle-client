import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaHeart } from 'react-icons/fa';
import { FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import useTitle from '../hooks/useTitle';
import Loader from '../components/Loader';
import RecipeImage from '../components/RecipeImage';
import UpdateModal from '../components/UpdateModal';
import { api, toLines } from '../utils/api';

export default function MyRecipes() {
  useTitle('My Recipes');
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api(`/my-recipes?email=${encodeURIComponent(user.email)}`)
      .then(setRecipes)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [user.email]);

  const handleDelete = async (recipe) => {
    const isDark = document.documentElement.classList.contains('dark');
    const { isConfirmed } = await Swal.fire({
      title: `Delete “${recipe.title}”?`,
      text: 'This removes it from Ladle for everyone. You can’t undo this.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete recipe',
      cancelButtonText: 'Keep it',
      confirmButtonColor: '#be4026',
      cancelButtonColor: '#1e4a3b',
      background: isDark ? '#162820' : '#fff',
      color: isDark ? '#e8eee6' : '#1a2620',
    });
    if (!isConfirmed) return;
    try {
      await api(`/recipes/${recipe._id}?email=${encodeURIComponent(user.email)}`, { method: 'DELETE' });
      setRecipes((list) => list.filter((r) => r._id !== recipe._id));
      toast.success('Recipe deleted.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdate = async (data) => {
    setSaving(true);
    try {
      const updated = await api(`/recipes/${editing._id}`, {
        method: 'PUT',
        body: { ...data, email: user.email },
      });
      setRecipes((list) => list.map((r) => (r._id === updated._id ? updated : r)));
      setEditing(null);
      toast.success('Recipe updated.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const closeModal = useCallback(() => setEditing(null), []);

  if (loading) return <Loader label="Opening your recipe box…" />;

  return (
    <section className="container-x py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl text-ink md:text-5xl">My recipes</h1>
          <p className="mt-2 text-muted">{recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} you’ve added</p>
        </div>
        <Link to="/add-recipe" className="btn-accent">Add a recipe</Link>
      </div>

      {recipes.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="text-lg text-ink">You haven’t added a recipe yet.</p>
          <p className="mt-1 text-muted">Start with the dish people always ask you to make.</p>
          <Link to="/add-recipe" className="btn-primary mt-5">Add your first recipe</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((r) => (
            <article key={r._id} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
              <RecipeImage src={r.image} alt={r.title} cuisine={r.cuisineType} className="aspect-[16/10] w-full" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-medium text-basil">{r.cuisineType}</span>
                  <span className="flex items-center gap-3 text-muted">
                    <span className="flex items-center gap-1"><FiClock aria-hidden="true" /> {r.prepTime} min</span>
                    <span className="flex items-center gap-1"><FaHeart className="text-paprika" aria-hidden="true" /> {r.likeCount}</span>
                  </span>
                </div>
                <h2 className="mt-2 text-2xl text-ink">{r.title}</h2>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.categories?.map((c) => (
                    <span key={c} className="rounded-full bg-saffron/20 px-2.5 py-0.5 text-xs font-medium text-ink">{c}</span>
                  ))}
                </div>

                <h3 className="mt-4 font-sans text-sm font-semibold text-ink">Ingredients</h3>
                <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-muted">
                  {toLines(r.ingredients).slice(0, 5).map((l, i) => <li key={i}>{l}</li>)}
                  {toLines(r.ingredients).length > 5 && <li className="list-none text-basil">+ {toLines(r.ingredients).length - 5} more</li>}
                </ul>

                <h3 className="mt-4 font-sans text-sm font-semibold text-ink">Instructions</h3>
                <p className="mt-1 line-clamp-3 text-sm text-muted">{toLines(r.instructions).join(' ')}</p>

                <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
                  <button onClick={() => setEditing(r)} className="btn-ghost"><FiEdit2 /> Update</button>
                  <button onClick={() => handleDelete(r)} className="btn-danger"><FiTrash2 /> Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing && <UpdateModal recipe={editing} onClose={closeModal} onSave={handleUpdate} saving={saving} />}
    </section>
  );
}
