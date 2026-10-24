import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import { api, CUISINES } from '../utils/api';
import useTitle from '../hooks/useTitle';

export default function AllRecipes() {
  useTitle('All Recipes');
  const [params, setParams] = useSearchParams();
  const cuisine = params.get('cuisine') || '';
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    api(`/recipes${cuisine ? `?cuisine=${encodeURIComponent(cuisine)}` : ''}`)
      .then(setRecipes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [cuisine]);

  const handleFilter = (e) => {
    const value = e.target.value;
    setParams(value ? { cuisine: value } : {});
  };

  return (
    <section className="container-x py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl text-ink md:text-5xl">All recipes</h1>
          <p className="mt-2 text-muted">
            {loading ? 'Loading recipes…' : `${recipes.length} ${recipes.length === 1 ? 'recipe' : 'recipes'}${cuisine ? ` in ${cuisine}` : ' from every cook'}`}
          </p>
        </div>
        <div className="w-full sm:w-60">
          <label htmlFor="cuisine-filter" className="field-label">Filter by cuisine</label>
          <select id="cuisine-filter" className="field" value={cuisine} onChange={handleFilter}>
            <option value="">All cuisines</option>
            {CUISINES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <Loader compact />
      ) : error ? (
        <p className="mt-10 rounded-xl border border-paprika/40 bg-paprika/10 p-5 text-paprika">{error}</p>
      ) : recipes.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="text-lg text-ink">No {cuisine} recipes yet.</p>
          <Link to="/add-recipe" className="btn-accent mt-4">Add one</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipes.map((r) => <RecipeCard key={r._id} recipe={r} actionLabel="See Details" showPrep />)}
        </div>
      )}
    </section>
  );
}
