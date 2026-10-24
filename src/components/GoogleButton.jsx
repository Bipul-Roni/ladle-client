import { FcGoogle } from 'react-icons/fc';

export default function GoogleButton({ onClick, disabled }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="btn-ghost w-full py-3">
      <FcGoogle size={20} /> Continue with Google
    </button>
  );
}
