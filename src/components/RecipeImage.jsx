import { useState } from 'react';

const looks = {
  Italian: { emoji: '🍝', tone: 'bg-basil/15' },
  Mexican: { emoji: '🌮', tone: 'bg-paprika/15' },
  Indian: { emoji: '🍛', tone: 'bg-saffron/20' },
  Chinese: { emoji: '🥟', tone: 'bg-paprika/10' },
  Others: { emoji: '🍲', tone: 'bg-ink/10' },
};

// Shows the recipe photo, or a cuisine-tinted placeholder when there is none
export default function RecipeImage({ src, alt, cuisine, className = '' }) {
  const [broken, setBroken] = useState(false);
  const look = looks[cuisine] || looks.Others;

  if (!src || broken) {
    return (
      <div className={`grid place-items-center ${look.tone} ${className}`} role="img" aria-label={`${alt} (no photo)`}>
        <span className="text-6xl" aria-hidden="true">{look.emoji}</span>
      </div>
    );
  }
  return (
    <img src={src} alt={alt} loading="lazy" onError={() => setBroken(true)} className={`object-cover ${className}`} />
  );
}
