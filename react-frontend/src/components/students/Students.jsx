// File: src/components/students/Students.jsx
import { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const fetchStudents = async (searchVal = search) => {
    setLoading(true);
    setError('');
    try {
      const params = { page };
      if (searchVal) params.search = searchVal;
      const res = await api.get('/students', { params });
      setStudents(res.data.data);
      setMeta(res.data);
    } catch {
      setError('Failed to load students.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchStudents(search);
  };

  const statusColor = (s) => s === 'active' ? '#059669' : '#dc2626';

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>👩‍🎓 Student Records</h1>
          <p style={styles.sub}>{meta.total ? `${meta.total} students total` : ''}</p>
        </div>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>🔍 Search</button>
        </form>
      </div>

      {error && <div style={styles.errorBox}>{error}</div>}

      {loading ? (
        <LoadingSpinner message="Loading students..." />
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Student ID</th>
                <th style={styles.th}>Full Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>Year Level</th>
                <th style={styles.th}>Gender</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} style={styles.tr}>
                  <td style={styles.td}><code style={styles.code}>{s.student_id}</code></td>
                  <td style={styles.td}><strong>{s.first_name} {s.last_name}</strong></td>
                  <td style={styles.td}><span style={styles.email}>{s.email}</span></td>
                  <td style={styles.td}><span style={styles.dept}>{s.department.replace('College of ', '')}</span></td>
                  <td style={styles.td}>{s.year_level}</td>
                  <td style={styles.td}>{s.gender}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, color: statusColor(s.status), background: statusColor(s.status) + '18' }}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={styles.pagination}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={styles.pageBtn}
            >← Prev</button>
            <span style={styles.pageInfo}>
              Page {meta.current_page} of {meta.last_page}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= meta.last_page}
              style={styles.pageBtn}
            >Next →</button>
          </div>
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
    flexWrap: 'wrap',
    gap: 12,
  },
  title: { margin: 0, fontSize: 24, fontWeight: 800, color: '#1a3a6b' },
  sub: { margin: '4px 0 0', fontSize: 13, color: '#888' },
  searchForm: { display: 'flex', gap: 8 },
  searchInput: {
    padding: '10px 14px',
    border: '1.5px solid #dde3ef',
    borderRadius: 8,
    fontSize: 13,
    outline: 'none',
    width: 260,
    fontFamily: "'Segoe UI', sans-serif",
    background: '#fff',
    color: '#222',
  },
  searchBtn: {
    background: '#1a3a6b',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '10px 16px',
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
  tableWrap: {
    background: '#fff',
    borderRadius: 14,
    boxShadow: '0 2px 16px rgba(26,58,107,0.07)',
    border: '1px solid #e8edf5',
    overflow: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thead: {
    background: '#1a3a6b',
    color: '#fff',
  },
  th: {
    padding: '13px 16px',
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    whiteSpace: 'nowrap',
  },
  tr: {
    borderBottom: '1px solid #f0f4fa',
    transition: 'background 0.15s',
  },
  td: {
    padding: '12px 16px',
    fontSize: 13,
    color: '#333',
    verticalAlign: 'middle',
  },
  code: {
    background: '#f0f4fa',
    borderRadius: 4,
    padding: '2px 6px',
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#1a3a6b',
  },
  email: { color: '#2563eb', fontSize: 12 },
  dept: { fontSize: 12, color: '#555' },
  badge: {
    display: 'inline-block',
    borderRadius: 12,
    padding: '3px 10px',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'capitalize',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: '16px',
    borderTop: '1px solid #f0f4fa',
  },
  pageBtn: {
    background: '#1a3a6b',
    color: '#fff',
    border: 'none',
    borderRadius: 7,
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: 13,
    fontFamily: "'Segoe UI', sans-serif",
    opacity: 1,
  },
  pageInfo: { fontSize: 13, color: '#666', fontWeight: 600 },
};
