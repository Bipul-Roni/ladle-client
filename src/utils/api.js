export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const CUISINES = ['Italian', 'Mexican', 'Indian', 'Chinese', 'Others'];
export const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan', 'Snack'];

// Small fetch wrapper: throws with the server's message so pages can toast it
export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong. Try again.');
  return data;
}

export const toLines = (text = '') =>
  String(text)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

// Friendlier messages for common Firebase auth errors
export function authMessage(error) {
  const code = error?.code || '';
  const map = {
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/user-not-found': 'No account uses that email. Register first.',
    'auth/wrong-password': 'Email or password is incorrect.',
    'auth/email-already-in-use': 'That email already has an account. Log in instead.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/popup-closed-by-user': 'Google sign-in was closed before it finished.',
    'auth/too-many-requests': 'Too many attempts. Wait a minute and try again.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  };
  return map[code] || error?.message || 'Something went wrong. Try again.';
}
