import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import { FaHeart } from 'react-icons/fa';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import useTitle from '../hooks/useTitle';
import Loader from '../components/Loader';
import Avatar from '../components/Avatar';
import RecipeImage from '../components/RecipeImage';
import { api, toLines } from '../utils/api';

export default function RecipeDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liking, setLiking] = useState(false);
  useTitle(recipe?.title || 'Recipe');

  useEffect(() => {
    api(`/recipes/${id}`)
      .then(setRecipe)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader label="Plating up…" />;
  if (error || !recipe) {
    return (
      <section className="container-x py-20 text-center">
        <h1 className="text-3xl text-ink">This recipe isn’t on the menu</h1>
        <p className="mt-2 text-muted">{error || 'It may have been deleted by its author.'}</p>
        <Link to="/all-recipes" className="btn-primary mt-6">Back to all recipes</Link>
      </section>
    );
  }

  const isOwner = user?.email === recipe.authorEmail;

  const handleLike = async () => {
    if (isOwner) {
      toast.error('You can’t like your own recipe.');
      return;
    }
    setLiking(true);
    try {
      const { likeCount } = await api(`/recipes/${id}/like`, { method: 'PATCH', body: { email: user.email } });
      setRecipe((r) => ({ ...r, likeCount }));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLiking(false);
    }
  };

  const ingredients = toLines(recipe.ingredients);
  const steps = toLines(recipe.instructions);

  return (
    <article className="container-x py-10 md:py-14">
      <p className="mb-6 rounded-xl bg-saffron/20 px-5 py-3 text-center font-semibold text-ink" aria-live="polite">
        {recipe.likeCount} people interested in this recipe
      </p>

      <Link to="/all-recipes" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink">
        <FiArrowLeft /> All recipes
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <RecipeImage src={recipe.image} alt={recipe.title} cuisine={recipe.cuisineType} className="aspect-[4/3] w-full rounded-2xl" />

        <div>
          <p className="font-medium text-basil">{recipe.cuisineType}</p>
          <h1 className="mt-1 text-4xl leading-tight text-ink md:text-5xl">{recipe.title}</h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-muted">
            <span className="flex items-center gap-2"><FiClock /> {recipe.prepTime} minutes</span>
            <span className="flex items-center gap-2"><FaHeart className="text-paprika" /> {recipe.likeCount} likes</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {recipe.categories?.map((c) => (
              <span key={c} className="rounded-full border border-line px-3 py-1 text-sm text-ink">{c}</span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-line pt-6">
            <Avatar src={recipe.authorPhoto} name={recipe.authorName} className="h-11 w-11" />
            <div>
              <p className="text-sm text-muted">Recipe by</p>
              <p className="font-semibold text-ink">{recipe.authorName}{isOwner && ' (you)'}</p>
            </div>
          </div>

          <span
            className="mt-6 inline-block"
            data-tooltip-id="like-tip"
            data-tooltip-content={isOwner ? 'You can’t like your own recipe' : 'Like as many times as you want'}
          >
            <button onClick={handleLike} disabled={liking || isOwner} className="btn-danger px-7 py-3 text-base">
              <FaHeart /> {liking ? 'Liking…' : 'Like this recipe'}
            </button>
          </span>
          <Tooltip id="like-tip" place="top" />
        </div>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <section>
          <h2 className="text-2xl text-ink">Ingredients</h2>
          <ul className="mt-4 divide-y divide-line rounded-2xl border border-line bg-surface">
            {ingredients.map((item, i) => (
              <li key={i} className="px-5 py-3 text-ink">{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl text-ink">Instructions</h2>
          <ol className="mt-4 space-y-5">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-basil font-semibold text-onbasil">{i + 1}</span>
                <p className="pt-1.5 leading-relaxed text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
