// File: src/components/dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import api from '../../services/api';
import EnrollmentChart from './EnrollmentChart';
import CourseDistributionChart from './CourseDistributionChart';
import AttendanceChart from './AttendanceChart';
import LoadingSpinner from '../common/LoadingSpinner';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get('/dashboard/overview');
      setData(res.data);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading dashboard..." />;

  if (error) return (
    <div style={styles.errorWrap}>
      <span style={{ fontSize: 32 }}>⚠️</span>
      <p style={{ color: '#c0392b' }}>{error}</p>
      <button onClick={fetchDashboard} style={styles.retryBtn}>Retry</button>
    </div>
  );

  const stats = data?.stats || {};

  const statCards = [
    { label: 'Total Students', value: stats.totalStudents?.toLocaleString(), icon: '👩‍🎓', color: '#1a3a6b' },
    { label: 'Active Students', value: stats.activeStudents?.toLocaleString(), icon: '✅', color: '#059669' },
    { label: 'Total Courses', value: stats.totalCourses, icon: '📚', color: '#c9a227' },
    { label: 'School Days', value: stats.totalSchoolDays, icon: '📅', color: '#7c3aed' },
    { label: 'Holidays', value: stats.holidays, icon: '🎉', color: '#7a1f1f' },
    { label: 'Avg Attendance', value: stats.avgAttendance?.toLocaleString(), icon: '📊', color: '#0891b2' },
  ];

  return (
    <div style={styles.page}>
      {/* Page Header */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>📋 Dashboard Overview</h1>
          <p style={styles.pageSub}>University of Mindanao — Academic Year 2024</p>
        </div>
        <button onClick={fetchDashboard} style={styles.refreshBtn}>🔄 Refresh</button>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        {statCards.map((s) => (
          <div key={s.label} style={styles.statCard}>
            <div style={{ ...styles.statIcon, background: s.color + '18', color: s.color }}>
              {s.icon}
            </div>
            <div>
              <div style={styles.statValue}>{s.value ?? '—'}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div style={styles.chartsGrid}>
        <EnrollmentChart data={data?.monthlyEnrollment || []} />
        <CourseDistributionChart data={data?.courseDistribution || []} />
        <AttendanceChart data={data?.attendancePatterns || []} />
      </div>
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
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  pageTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 800,
    color: '#1a3a6b',
  },
  pageSub: {
    margin: '4px 0 0',
    fontSize: 13,
    color: '#888',
  },
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 16,
    marginBottom: 28,
  },
  statCard: {
    background: '#fff',
    borderRadius: 12,
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    boxShadow: '0 2px 12px rgba(26,58,107,0.07)',
    border: '1px solid #e8edf5',
  },
  statIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
    flexShrink: 0,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 800,
    color: '#1a3a6b',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
  },
  errorWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 80,
    fontFamily: "'Segoe UI', sans-serif",
  },
  retryBtn: {
    background: '#1a3a6b',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 24px',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
  },
};
