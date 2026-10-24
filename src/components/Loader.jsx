import Lottie from 'lottie-react';
import cookingDots from '../assets/cooking-dots.json';

export default function Loader({ label = 'Loading…', compact = false }) {
  return (
    <div className={`flex flex-col items-center justify-center ${compact ? 'py-10' : 'min-h-[60vh]'}`} role="status">
      <Lottie animationData={cookingDots} loop className="h-28 w-28" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
