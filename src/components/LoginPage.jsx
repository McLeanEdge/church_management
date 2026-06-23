import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const auth = getAuth();

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged in App.jsx will handle the redirect automatically
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      setError('Enter your email address above, then click Forgot Password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError('');
    } catch (err) {
      setError(friendlyError(err.code));
    }
  }

  function friendlyError(code) {
    switch (code) {
      case 'auth/invalid-email':         return 'That email address doesn\'t look right.';
      case 'auth/user-not-found':        return 'No account found with that email.';
      case 'auth/wrong-password':        return 'Incorrect password. Try again.';
      case 'auth/invalid-credential':    return 'Email or password is incorrect.';
      case 'auth/too-many-requests':     return 'Too many attempts. Please wait a moment and try again.';
      case 'auth/network-request-failed': return 'Network error. Check your connection.';
      default:                           return 'Something went wrong. Please try again.';
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo / Branding */}
        <div style={styles.brand}>
          <div style={styles.cross}>✝</div>
          <h1 style={styles.churchName}>Throne of God's Grace</h1>
          <p style={styles.churchSub}>Ministries Management Portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={styles.input}
              autoComplete="email"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={styles.input}
              autoComplete="current-password"
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}
          {resetSent && <p style={styles.success}>Password reset email sent! Check your inbox.</p>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <button onClick={handleForgotPassword} style={styles.forgotBtn}>
          Forgot password?
        </button>

        <p style={styles.hint}>
          Access is restricted to authorised staff only.<br />
          Contact your administrator to get an account.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f2027 0%, #1a3a4a 50%, #0f2027 100%)',
    padding: '1rem',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '2.5rem 2rem',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
  },
  brand: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  cross: {
    fontSize: '2.5rem',
    color: '#1a73e8',
    lineHeight: 1,
    marginBottom: '0.5rem',
  },
  churchName: {
    fontSize: '1.35rem',
    fontWeight: 700,
    color: '#1a1a2e',
    margin: '0 0 0.25rem',
    lineHeight: 1.2,
  },
  churchSub: {
    fontSize: '0.85rem',
    color: '#888',
    margin: 0,
    letterSpacing: '0.02em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#444',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1.5px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    color: '#1a1a2e',
  },
  error: {
    background: '#fff0f0',
    border: '1px solid #ffcccc',
    borderRadius: '6px',
    color: '#c0392b',
    fontSize: '0.875rem',
    padding: '0.6rem 0.8rem',
    margin: 0,
  },
  success: {
    background: '#f0fff4',
    border: '1px solid #c6efce',
    borderRadius: '6px',
    color: '#276221',
    fontSize: '0.875rem',
    padding: '0.6rem 0.8rem',
    margin: 0,
  },
  button: {
    background: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.85rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '0.25rem',
    transition: 'background 0.2s',
  },
  forgotBtn: {
    display: 'block',
    width: '100%',
    background: 'none',
    border: 'none',
    color: '#1a73e8',
    fontSize: '0.875rem',
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: '1rem',
    padding: '0.25rem',
  },
  hint: {
    textAlign: 'center',
    fontSize: '0.78rem',
    color: '#aaa',
    marginTop: '1.5rem',
    lineHeight: 1.6,
  },
};
