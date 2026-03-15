// File: src/components/auth/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.logoWrap}>
          <div style={styles.umLogo}>UM</div>
          <div>
            <div style={styles.umTitle}>University of Mindanao</div>
            <div style={styles.umSub}>Student Information Portal</div>
          </div>
        </div>
        <div style={styles.tagline}>
          "The Biggest Privatized University in the Philippines"
        </div>
        <div style={styles.pillars}>
          {['Instruction', 'Research', 'Extension', 'Production'].map((p) => (
            <div key={p} style={styles.pillar}>{p}</div>
          ))}
        </div>
        <div style={styles.leftFooter}>Davao City, Philippines</div>
      </div>

      {/* Right Panel - Login Form */}
      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.cardLogo}>🎓</div>
            <h2 style={styles.cardTitle}>Portal Login</h2>
            <p style={styles.cardSub}>Enter your credentials to access the portal</p>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <span style={{ marginRight: 8 }}>⚠️</span>{error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>✉️</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@um.edu.ph"
                  value={form.email}
                  onChange={handleChange}
                  style={styles.input}
                  autoComplete="email"
                />
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>🔒</span>
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  style={{ ...styles.input, paddingRight: 40 }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={styles.eyeBtn}
                >{showPass ? '🙈' : '👁️'}</button>
              </div>
            </div>

            <button type="submit" style={styles.loginBtn} disabled={loading}>
              {loading ? (
                <span style={styles.spinner}>⏳ Signing in...</span>
              ) : (
                '🔐 Sign In to Portal'
              )}
            </button>
          </form>

          <div style={styles.hint}>
            <strong>Demo:</strong> admin@um.edu.ph &nbsp;/&nbsp; password
          </div>
        </div>

        <div style={styles.rightFooter}>
          © {new Date().getFullYear()} University of Mindanao — IT15/L Project
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
  },
  leftPanel: {
    width: '42%',
    background: 'linear-gradient(160deg, #1a3a6b 0%, #0d2347 60%, #7a1f1f 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '60px 48px',
    color: '#fff',
    gap: 32,
  },
  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  umLogo: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: '#c9a227',
    color: '#1a3a6b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 900,
    letterSpacing: 1,
    flexShrink: 0,
    boxShadow: '0 4px 16px rgba(201,162,39,0.4)',
  },
  umTitle: {
    fontSize: 20,
    fontWeight: 800,
    lineHeight: 1.2,
    color: '#f0d080',
  },
  umSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  tagline: {
    fontStyle: 'italic',
    fontSize: 15,
    color: 'rgba(255,255,255,0.7)',
    borderLeft: '3px solid #c9a227',
    paddingLeft: 16,
    lineHeight: 1.6,
    maxWidth: 320,
  },
  pillars: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
  },
  pillar: {
    background: 'rgba(201,162,39,0.2)',
    border: '1px solid rgba(201,162,39,0.5)',
    borderRadius: 20,
    padding: '6px 18px',
    fontSize: 13,
    color: '#f0d080',
    fontWeight: 600,
  },
  leftFooter: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 'auto',
    paddingTop: 40,
  },
  rightPanel: {
    flex: 1,
    background: '#f4f6fb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: '40px 44px',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 8px 40px rgba(26,58,107,0.12)',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: 28,
  },
  cardLogo: {
    fontSize: 44,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: '#1a3a6b',
    margin: '0 0 6px',
  },
  cardSub: {
    fontSize: 13,
    color: '#888',
    margin: 0,
  },
  errorBox: {
    background: '#fff3f3',
    border: '1px solid #f5c6cb',
    borderRadius: 8,
    padding: '10px 14px',
    marginBottom: 20,
    color: '#c0392b',
    fontSize: 13,
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: '#444',
  },
  inputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    fontSize: 16,
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '12px 12px 12px 40px',
    border: '1.5px solid #dde3ef',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
    transition: 'border 0.2s',
    boxSizing: 'border-box',
    background: '#fafbfc',
    color: '#222',
  },
  eyeBtn: {
    position: 'absolute',
    right: 10,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: 16,
    padding: 4,
  },
  loginBtn: {
    background: 'linear-gradient(135deg, #1a3a6b, #0d2347)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '14px',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: 8,
    transition: 'opacity 0.2s',
    letterSpacing: 0.3,
  },
  spinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  hint: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    background: '#f9fafb',
    borderRadius: 8,
    padding: '10px 14px',
    border: '1px solid #eee',
  },
  rightFooter: {
    marginTop: 24,
    fontSize: 12,
    color: '#aaa',
  },
};
