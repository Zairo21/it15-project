// File: src/components/common/Navbar.jsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await api.post('/logout');
    } catch (_) {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { label: 'Students', path: '/students', icon: '👩‍🎓' },
    { label: 'Courses', path: '/courses', icon: '📚' },
    { label: 'Weather', path: '/weather', icon: '🌤️' },
  ];

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div style={styles.brand} onClick={() => navigate('/dashboard')}>
        <div style={styles.umBadge}>UM</div>
        <div style={styles.brandText}>
          <span style={styles.brandTitle}>University of Mindanao</span>
          <span style={styles.brandSub}>Student Portal</span>
        </div>
      </div>

      {/* Nav Links */}
      <div style={styles.navLinks}>
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              ...styles.navBtn,
              ...(location.pathname === item.path ? styles.navBtnActive : {}),
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* User area */}
      <div style={styles.userArea}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>
            {user.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div style={styles.userName}>{user.name || 'Admin'}</div>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn} disabled={loggingOut}>
          {loggingOut ? '...' : '🚪 Logout'}
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(90deg, #1a3a6b 0%, #0d2347 100%)',
    padding: '0 28px',
    height: 62,
    gap: 24,
    boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
    userSelect: 'none',
    marginRight: 16,
  },
  umBadge: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: '#c9a227',
    color: '#1a3a6b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    fontSize: 14,
    flexShrink: 0,
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandTitle: {
    color: '#f0d080',
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  brandSub: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
  },
  navLinks: {
    display: 'flex',
    gap: 4,
    flex: 1,
  },
  navBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'transparent',
    border: 'none',
    color: 'rgba(255,255,255,0.75)',
    padding: '8px 14px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    transition: 'all 0.2s',
    fontFamily: "'Segoe UI', sans-serif",
  },
  navBtnActive: {
    background: 'rgba(201,162,39,0.2)',
    color: '#f0d080',
    fontWeight: 700,
  },
  userArea: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginLeft: 'auto',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: '#c9a227',
    color: '#1a3a6b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: 13,
  },
  userName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 500,
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff',
    borderRadius: 6,
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: 12,
    fontFamily: "'Segoe UI', sans-serif",
  },
};
