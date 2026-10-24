import { Link } from 'react-router';

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`} aria-label="Ladle home">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <circle cx="12" cy="20" r="9" fill="rgb(var(--saffron))" />
        <path d="M12 20 L28 4" stroke="rgb(var(--basil))" strokeWidth="3.2" strokeLinecap="round" />
        <circle cx="12" cy="20" r="5" fill="rgb(var(--basil))" />
      </svg>
      <span className="font-display text-2xl text-ink">Ladle</span>
    </Link>
  );
}
