// File: src/components/courses/Courses.jsx
import { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/courses');
      setCourses(res.data);
    } catch {
      setError('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  const fillPct = (enrolled, max) => Math.round((enrolled / max) * 100);
  const fillColor = (pct) => pct > 90 ? '#dc2626' : pct > 70 ? '#d97706' : '#059669';

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>📚 Courses Offered</h1>
          <p style={styles.sub}>{courses.length} courses across all departments</p>
        </div>
        <button onClick={fetchCourses} style={styles.refreshBtn}>🔄 Refresh</button>
      </div>

      {error && <div style={styles.errorBox}>{error}</div>}

      {loading ? (
        <LoadingSpinner message="Loading courses..." />
      ) : (
        <div style={styles.grid}>
          {courses.map((c) => {
            const pct = fillPct(c.enrolled_count, c.max_slots);
            const color = fillColor(pct);
            return (
              <div key={c.id} style={styles.card}>
                <div style={styles.cardTop}>
                  <span style={styles.code}>{c.course_code}</span>
                  <span style={{ ...styles.badge, color, background: color + '18' }}>
                    {c.status}
                  </span>
                </div>
                <h3 style={styles.courseName}>{c.course_name}</h3>
                <p style={styles.dept}>{c.department}</p>

                <div style={styles.meta}>
                  <span>👤 {c.instructor}</span>
                  <span>📅 {c.schedule}</span>
                  <span>🚪 {c.room}</span>
                  <span>⚡ {c.units} units</span>
                </div>

                {/* Enrollment progress bar */}
                <div style={styles.progressArea}>
                  <div style={styles.progressLabel}>
                    <span>Enrollment</span>
                    <span style={{ color, fontWeight: 700 }}>{c.enrolled_count}/{c.max_slots}</span>
                  </div>
                  <div style={styles.progressTrack}>
                    <div style={{ ...styles.progressFill, width: `${pct}%`, background: color }} />
                  </div>
                  <div style={{ ...styles.progressPct, color }}>{pct}% full</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: '28px 32px',
    fontFamily: "'Segoe UI', sans-serif",
    background: '#f4f6fb',
    minHeight: 'calc(100vh - 62px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: { margin: 0, fontSize: 24, fontWeight: 800, color: '#1a3a6b' },
  sub: { margin: '4px 0 0', fontSize: 13, color: '#888' },
  refreshBtn: {
    background: '#1a3a6b',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '9px 18px',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "'Segoe UI', sans-serif",
  },
  errorBox: {
    background: '#fff3f3',
    border: '1px solid #f5c6cb',
    borderRadius: 8,
    padding: '12px 16px',
    color: '#c0392b',
    fontSize: 13,
    marginBottom: 16,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 20,
  },
  card: {
    background: '#fff',
    borderRadius: 14,
    padding: '22px',
    boxShadow: '0 2px 12px rgba(26,58,107,0.07)',
    border: '1px solid #e8edf5',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  code: {
    background: '#eef2fb',
    color: '#1a3a6b',
    borderRadius: 6,
    padding: '4px 10px',
    fontSize: 12,
    fontWeight: 800,
    fontFamily: 'monospace',
  },
  badge: {
    borderRadius: 12,
    padding: '3px 10px',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'capitalize',
  },
  courseName: {
    margin: 0,
    fontSize: 15,
    fontWeight: 700,
    color: '#1a3a6b',
    lineHeight: 1.3,
  },
  dept: {
    margin: 0,
    fontSize: 12,
    color: '#888',
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    fontSize: 12,
    color: '#555',
  },
  progressArea: { marginTop: 4 },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 12,
    marginBottom: 6,
    color: '#555',
  },
  progressTrack: {
    height: 8,
    background: '#f0f4fa',
    borderRadius: 99,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 99,
    transition: 'width 0.5s ease',
  },
  progressPct: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: 600,
    textAlign: 'right',
  },
};
