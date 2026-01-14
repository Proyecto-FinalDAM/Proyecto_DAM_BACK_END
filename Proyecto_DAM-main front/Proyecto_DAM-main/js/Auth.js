const API = 'http://localhost:9090/api/auth';

// =======================
// LOGIN
// =======================
export async function login(email, password) {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) return null;

  const user = await res.json();
  localStorage.setItem('cinehubUser', JSON.stringify(user));
  return user;
}

// =======================
// REGISTER
// =======================
export async function register(data) {
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  return res.ok;
}

// =======================
// SESSION
// =======================
export function getUser() {
  const u = localStorage.getItem('cinehubUser');
  return u ? JSON.parse(u) : null;
}

export function logout() {
  localStorage.removeItem('cinehubUser');
  location.reload();
}
