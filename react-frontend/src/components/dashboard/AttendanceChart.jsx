// File: src/components/dashboard/AttendanceChart.jsx
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function AttendanceChart({ data = [] }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.icon}>📈</div>
        <div>
          <h3 style={styles.title}>Attendance Patterns Over School Days</h3>
          <p style={styles.sub}>Average daily attendance per month (2024)</p>
        </div>
      </div>
      {data.length === 0 ? (
        <div style={styles.empty}>No attendance data available</div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#666' }} />
            <YAxis domain={[300, 500]} tick={{ fontSize: 12, fill: '#666' }} />
            <Tooltip
              contentStyle={{
                background: '#fff',
                border: '1px solid #e0e7ef',
                borderRadius: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}
              formatter={(value, name) => [
                name === 'attendance' ? `${value} students` : `${value} days`,
                name === 'attendance' ? 'Avg Attendance' : 'School Days',
              ]}
            />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
              formatter={(value) =>
                value === 'attendance' ? 'Avg Attendance' : 'School Days'
              }
            />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#1a3a6b"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#1a3a6b' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="schoolDays"
              stroke="#c9a227"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: '#c9a227' }}
            />
          </LineChart>
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
    gridColumn: '1 / -1',
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
