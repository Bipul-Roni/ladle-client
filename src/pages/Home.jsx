import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Fade, Slide } from 'react-awesome-reveal';
import Banner from '../components/Banner';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import { api, CUISINES } from '../utils/api';
import useTitle from '../hooks/useTitle';

const steps = [
  { title: 'Write it down', text: 'Add the ingredients, steps, cuisine and how long it takes. A photo link is optional.' },
  { title: 'Share with the table', text: 'Your recipe appears in All Recipes for every cook on Ladle to find and filter.' },
  { title: 'Collect the likes', text: 'Cooks like the dishes they love. The most-liked six are featured on this page.' },
];

const cuisineNotes = {
  Italian: { emoji: '🍝', note: 'Pasta, risotto and slow Sunday sauces' },
  Mexican: { emoji: '🌮', note: 'Tacos, moles and bright salsas' },
  Indian: { emoji: '🍛', note: 'Curries, dals and spiced rice' },
  Chinese: { emoji: '🥟', note: 'Stir-fries, dumplings and noodles' },
  Others: { emoji: '🍲', note: 'Everything from shakshuka to bibimbap' },
};

export default function Home() {
  useTitle('Home');
  const [top, setTop] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/recipes/top')
      .then(setTop)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Banner />

      {/* Top recipes — 6 most liked, fetched with sort + limit on the server */}
      <section id="top-recipes" className="container-x scroll-mt-20 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl text-ink md:text-4xl">Top recipes</h2>
            <p className="mt-2 text-muted">The six dishes with the most likes right now.</p>
          </div>
          <Link to="/all-recipes" className="btn-primary">See All Recipes</Link>
        </div>

        {loading ? (
          <Loader compact label="Gathering the favourites…" />
        ) : error ? (
          <p className="mt-10 rounded-xl border border-paprika/40 bg-paprika/10 p-5 text-paprika">{error}</p>
        ) : top.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center">
            <p className="text-lg text-ink">No recipes yet.</p>
            <Link to="/add-recipe" className="btn-accent mt-4">Add the first one</Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Fade cascade damping={0.08} triggerOnce>
              {top.map((r) => <RecipeCard key={r._id} recipe={r} />)}
            </Fade>
          </div>
        )}
      </section>

      {/* Extra section 1 — browse by cuisine */}
      <section className="border-y border-line bg-surface py-16 md:py-20">
        <div className="container-x">
          <h2 className="text-3xl text-ink md:text-4xl">Cook by cuisine</h2>
          <p className="mt-2 max-w-xl text-muted">Pick a kitchen and we’ll filter the book for you.</p>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
            {CUISINES.map((c) => (
              <Link
                key={c}
                to={`/all-recipes?cuisine=${c}`}
                className="group rounded-2xl border border-line bg-bg p-5 transition-colors hover:border-basil"
              >
                <span className="text-4xl" aria-hidden="true">{cuisineNotes[c].emoji}</span>
                <h3 className="mt-4 text-xl text-ink group-hover:text-basil">{c}</h3>
                <p className="mt-1 text-sm text-muted">{cuisineNotes[c].note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Extra section 2 — how it works (a real sequence, so numbered) */}
      <section className="container-x py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-3xl text-ink md:text-4xl">How Ladle works</h2>
            <p className="mt-3 max-w-sm text-muted">Three steps from your stove to everyone else’s.</p>
            <Link to="/add-recipe" className="btn-accent mt-6">Add your recipe</Link>
          </div>
          <ol className="grid gap-6 sm:grid-cols-3">
            <Slide direction="up" cascade damping={0.12} triggerOnce>
              {steps.map((s, i) => (
                <li key={s.title} className="border-t-4 border-saffron pt-5">
                  <span className="font-display text-4xl text-basil">{i + 1}</span>
                  <h3 className="mt-3 text-xl text-ink">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.text}</p>
                </li>
              ))}
            </Slide>
          </ol>
        </div>
      </section>
    </>
  );
}
