import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FiCheck, FiEye, FiEyeOff, FiX } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import useTitle from '../hooks/useTitle';
import AuthShell from '../components/AuthShell';
import GoogleButton from '../components/GoogleButton';
import { authMessage } from '../utils/api';

const rules = [
  { test: (p) => /[A-Z]/.test(p), label: 'An uppercase letter' },
  { test: (p) => /[a-z]/.test(p), label: 'A lowercase letter' },
  { test: (p) => p.length >= 6, label: 'At least 6 characters' },
];

export default function Register() {
  useTitle('Register');
  const { createUser, updateUserProfile, googleSignIn, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photo = form.photo.value.trim();
    setError('');

    const failed = rules.find((r) => !r.test(password));
    if (failed) {
      setError(`Password needs: ${failed.label.toLowerCase()}.`);
      return;
    }

    setBusy(true);
    try {
      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: photo });
      toast.success(`Welcome to Ladle, ${name}.`);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = authMessage(err);
      setError(msg);
      toast.error(msg);
      setLoading(false);
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await googleSignIn();
      toast.success('Signed up with Google.');
      navigate('/', { replace: true });
    } catch (err) {
      const msg = authMessage(err);
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Register" subtitle="Create an account to start your recipe collection.">
      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label htmlFor="name" className="field-label">Name</label>
          <input id="name" name="name" required autoComplete="name" className="field" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="field-label">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="photo" className="field-label">Photo URL</label>
          <input id="photo" name="photo" type="url" required className="field" placeholder="https://… link to your profile photo" />
        </div>
        <div>
          <label htmlFor="password" className="field-label">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPass ? 'text' : 'password'}
              required
              autoComplete="new-password"
              className="field pr-11"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="password-rules"
            />
            <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted hover:text-ink" aria-label={showPass ? 'Hide password' : 'Show password'}>
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <ul id="password-rules" className="mt-2 space-y-1 text-sm">
            {rules.map((r) => {
              const ok = r.test(password);
              return (
                <li key={r.label} className={`flex items-center gap-2 ${ok ? 'text-basil' : 'text-muted'}`}>
                  {ok ? <FiCheck aria-hidden="true" /> : <FiX aria-hidden="true" />} {r.label}
                </li>
              );
            })}
          </ul>
        </div>

        {error && <p className="rounded-lg bg-paprika/10 px-4 py-3 text-sm text-paprika" role="alert">{error}</p>}

        <button type="submit" disabled={busy} className="btn-primary w-full py-3 text-base">
          {busy ? 'Creating account…' : 'Register'}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
      </div>
      <GoogleButton onClick={handleGoogle} />

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link to="/login" state={location.state} className="font-semibold text-basil hover:underline">Login</Link>
      </p>
    </AuthShell>
  );
}
