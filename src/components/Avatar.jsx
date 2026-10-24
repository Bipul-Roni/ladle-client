import { useState } from 'react';

export default function Avatar({ src, name, className = 'h-10 w-10' }) {
  const [broken, setBroken] = useState(false);
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  if (!src || broken) {
    return (
      <span className={`grid place-items-center rounded-full bg-basil font-semibold text-onbasil ${className}`}>
        {initial}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={name || 'User avatar'}
      referrerPolicy="no-referrer"
      onError={() => setBroken(true)}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
