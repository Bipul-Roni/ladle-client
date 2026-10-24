import { Link } from 'react-router';
import Lottie from 'lottie-react';
import cookingDots from '../assets/cooking-dots.json';
import useTitle from '../hooks/useTitle';

// Custom 404 — no navbar or footer
export default function NotFound() {
  useTitle('Page not found');
  return (
    <main className="grid min-h-screen place-items-center bg-bg px-6 py-16 text-center">
      <div className="max-w-lg">
        <div className="flex items-center justify-center gap-3 font-display text-8xl text-ink sm:text-9xl" aria-label="404">
          <span>4</span>
          <svg viewBox="0 0 100 100" className="h-24 w-24 sm:h-28 sm:w-28" aria-hidden="true">
            <circle cx="50" cy="50" r="46" fill="rgb(var(--surface))" stroke="rgb(var(--line))" strokeWidth="4" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="rgb(var(--line))" strokeWidth="2" strokeDasharray="4 5" />
            <path d="M36 62 q14 -10 28 0" stroke="rgb(var(--muted))" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="40" cy="44" r="3.5" fill="rgb(var(--muted))" />
            <circle cx="60" cy="44" r="3.5" fill="rgb(var(--muted))" />
          </svg>
          <span>4</span>
        </div>
        <h1 className="mt-6 text-3xl text-ink sm:text-4xl">This plate came back empty</h1>
        <p className="mt-3 text-muted">
          The page you ordered isn’t on our menu. It may have moved, or the link has a typo.
        </p>
        <Lottie animationData={cookingDots} loop className="mx-auto h-24 w-24" />
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary px-6 py-3">Back to home</Link>
          <Link to="/all-recipes" className="btn-ghost px-6 py-3">Browse recipes</Link>
        </div>
      </div>
    </main>
  );
}
