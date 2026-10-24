import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import RecipeForm from '../components/RecipeForm';
import useAuth from '../hooks/useAuth';
import useTitle from '../hooks/useTitle';
import { api } from '../utils/api';

export default function AddRecipe() {
  useTitle('Add Recipe');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (data) => {
    if (data.categories.length === 0) {
      toast.error('Pick at least one category.');
      return;
    }
    setSubmitting(true);
    try {
      await api('/recipes', {
        method: 'POST',
        body: {
          ...data,
          likeCount: 0,
          authorEmail: user.email,
          authorName: user.displayName,
          authorPhoto: user.photoURL,
        },
      });
      toast.success(`“${data.title}” added to the book.`);
      navigate('/all-recipes');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-x max-w-4xl py-12 md:py-16">
      <h1 className="text-4xl text-ink md:text-5xl">Add a recipe</h1>
      <p className="mt-2 text-muted">Write it the way you’d explain it to a friend in your kitchen.</p>
      <div className="mt-10 rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <RecipeForm onSubmit={handleAdd} submitLabel="Add recipe" submitting={submitting} showLikeCount />
      </div>
    </section>
  );
}
