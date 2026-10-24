import { Link } from 'react-router';
import { FaHeart } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import RecipeImage from './RecipeImage';

export default function RecipeCard({ recipe, actionLabel = 'View Details', showPrep = false }) {
  const { _id, image, title, cuisineType, likeCount = 0, prepTime } = recipe;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="relative">
        <RecipeImage src={image} alt={title} cuisine={cuisineType} className="aspect-[4/3] w-full" />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-surface/95 px-3 py-1 text-sm font-semibold text-ink shadow-sm">
          <FaHeart className="text-paprika" aria-hidden="true" /> {likeCount}
          <span className="sr-only">likes</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-0 p-5">
        <p className="text-sm font-medium text-basil">{cuisineType}</p>
        <h3 className="mt-1 text-xl leading-snug text-ink">{title}</h3>
        {showPrep && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
            <FiClock aria-hidden="true" /> {prepTime} min
          </p>
        )}
        <div className="flex-1 pt-4" />
        <Link to={`/recipes/${_id}`} className="btn-ghost mt-auto w-full group-hover:border-basil">
          {actionLabel}
        </Link>
      </div>
    </article>
  );
}
