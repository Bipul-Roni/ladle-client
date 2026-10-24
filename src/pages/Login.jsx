import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import useTitle from '../hooks/useTitle';
import AuthShell from '../components/AuthShell';
import GoogleButton from '../components/GoogleButton';
import { authMessage } from '../utils/api';

export default function Login() {
  useTitle('Login');
  const { signIn, googleSignIn, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError('');
    setBusy(true);
    try {
      await signIn(email, password);
      toast.success('Welcome back to the kitchen.');
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
      toast.success('Logged in with Google.');
      navigate(from, { replace: true });
    } catch (err) {
      const msg = authMessage(err);
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Login" subtitle="Log in to your Ladle account.">
      <form onSubmit={handleLogin} className="space-y-5" noValidate={false}>
        <div>
          <label htmlFor="email" className="field-label">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="password" className="field-label">Password</label>
          <div className="relative">
            <input id="password" name="password" type={showPass ? 'text' : 'password'} required autoComplete="current-password" className="field pr-11" placeholder="Your password" />
            <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted hover:text-ink" aria-label={showPass ? 'Hide password' : 'Show password'}>
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <button
            type="button"
            onClick={() => toast.info('Password reset isn’t available yet. Contact hello@ladle.app for help.')}
            className="mt-2 text-sm font-medium text-basil hover:underline"
          >
            Forget password?
          </button>
        </div>

        {error && <p className="rounded-lg bg-paprika/10 px-4 py-3 text-sm text-paprika" role="alert">{error}</p>}

        <button type="submit" disabled={busy} className="btn-primary w-full py-3 text-base">
          {busy ? 'Logging in…' : 'Login'}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
      </div>
      <GoogleButton onClick={handleGoogle} />

      <p className="mt-6 text-center text-sm text-muted">
        New to Ladle?{' '}
        <Link to="/register" state={location.state} className="font-semibold text-basil hover:underline">Register</Link>
      </p>
    </AuthShell>
  );
}
