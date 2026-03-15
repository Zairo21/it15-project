// File: src/components/dashboard/CourseDistributionChart.jsx
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#1a3a6b', '#c9a227', '#7a1f1f', '#2563eb', '#059669', '#7c3aed', '#0891b2', '#dc2626'];

const shortName = (name) => {
  const map = {
    'College of Computer Studies': 'Computer Studies',
    'College of Engineering': 'Engineering',
    'College of Business Administration': 'Business Admin',
    'College of Education': 'Education',
    'College of Arts and Sciences': 'Arts & Sciences',
    'College of Nursing': 'Nursing',
    'College of Criminology': 'Criminology',
    'College of Architecture': 'Architecture',
  };
  return map[name] || name;
};

export default function CourseDistributionChart({ data = [] }) {
  const chartData = data.map((d) => ({ ...d, name: shortName(d.name) }));

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.icon}>🥧</div>
        <div>
          <h3 style={styles.title}>Student Distribution by College</h3>
          <p style={styles.sub}>Enrollment across departments</p>
        </div>
      </div>
      {chartData.length === 0 ? (
        <div style={styles.empty}>No data available</div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={45}
              paddingAngle={3}
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#fff',
                border: '1px solid #e0e7ef',
                borderRadius: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                fontSize: 12,
              }}
              formatter={(value) => [value, 'Students']}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
              formatter={(value) => <span style={{ color: '#555' }}>{value}</span>}
            />
          </PieChart>
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
