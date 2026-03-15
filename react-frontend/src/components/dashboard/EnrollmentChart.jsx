// File: src/components/dashboard/EnrollmentChart.jsx
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

export default function EnrollmentChart({ data = [] }) {
  const colors = ['#1a3a6b', '#0d2347', '#c9a227', '#2563eb', '#7a1f1f',
    '#1e6b3a', '#7c3aed', '#0891b2', '#dc2626', '#059669', '#d97706', '#7c2d12'];

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.icon}>📊</div>
        <div>
          <h3 style={styles.title}>Monthly Enrollment Trends</h3>
          <p style={styles.sub}>Number of students enrolled per month</p>
        </div>
      </div>
      {data.length === 0 ? (
        <div style={styles.empty}>No enrollment data available</div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#666' }} />
            <YAxis tick={{ fontSize: 12, fill: '#666' }} />
            <Tooltip
              contentStyle={{
                background: '#fff',
                border: '1px solid #e0e7ef',
                borderRadius: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
              formatter={(value) => [value, 'Students']}
            />
            <Bar dataKey="students" radius={[6, 6, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: 14,
    padding: '24px',
    boxShadow: '0 2px 16px rgba(26,58,107,0.07)',
    border: '1px solid #e8edf5',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  icon: { fontSize: 28 },
  title: { margin: 0, fontSize: 16, fontWeight: 700, color: '#1a3a6b' },
  sub: { margin: 0, fontSize: 12, color: '#888' },
  empty: { textAlign: 'center', color: '#aaa', padding: 40, fontSize: 14 },
};
