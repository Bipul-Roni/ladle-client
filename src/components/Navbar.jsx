import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import Avatar from './Avatar';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/all-recipes', label: 'All Recipes' },
  { to: '/add-recipe', label: 'Add Recipe' },
  { to: '/my-recipes', label: 'My Recipes' },
];

export default function Navbar() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setProfileOpen(false);
      toast.success('Logged out. See you at the stove.');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const navItems = links.map((l) => (
    <NavLink key={l.to} to={l.to} end={l.end} className="nav-link" onClick={() => setMenuOpen(false)}>
      {l.label}
    </NavLink>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="container-x flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <Logo />
        </div>

        <div className="hidden items-center gap-1 lg:flex">{navItems}</div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className="rounded-full ring-2 ring-saffron/70 ring-offset-2 ring-offset-bg"
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                data-tooltip-id="nav-tip"
                data-tooltip-content={user.displayName || 'Your profile'}
              >
                <Avatar src={user.photoURL} name={user.displayName} className="h-10 w-10" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-60 rounded-xl border border-line bg-surface p-4 shadow-lg">
                  <p className="font-semibold text-ink">{user.displayName || 'Home cook'}</p>
                  <p className="truncate text-sm text-muted">{user.email}</p>
                  <button onClick={handleLogout} className="btn-danger mt-4 w-full">
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost hidden sm:inline-flex">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </>
          )}
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-line bg-bg lg:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {navItems}
            {!user && (
              <Link to="/login" className="nav-link sm:hidden" onClick={() => setMenuOpen(false)}>Login</Link>
            )}
          </div>
        </div>
      )}
      <Tooltip id="nav-tip" place="bottom" />
    </header>
  );
}
