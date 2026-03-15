// File: src/components/weather/ForecastDisplay.jsx
import { getWeatherIconUrl } from '../../services/weatherApi';

const dayName = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export default function ForecastDisplay({ forecast = [] }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>📅 5-Day Forecast</h3>
      <div style={styles.grid}>
        {forecast.map((item, i) => (
          <div key={i} style={styles.dayCard}>
            <div style={styles.dayName}>{dayName(item.dt_txt)}</div>
            <img
              src={getWeatherIconUrl(item.weather[0].icon)}
              alt={item.weather[0].description}
              style={styles.icon}
            />
            <div style={styles.desc}>{item.weather[0].description}</div>
            <div style={styles.temp}>{Math.round(item.main.temp)}°C</div>
            <div style={styles.minmax}>
              <span style={{ color: '#2563eb' }}>↑{Math.round(item.main.temp_max)}°</span>
              {' '}
              <span style={{ color: '#888' }}>↓{Math.round(item.main.temp_min)}°</span>
            </div>
            <div style={styles.humidity}>💧 {item.main.humidity}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: 16,
    padding: '24px',
    boxShadow: '0 2px 16px rgba(26,58,107,0.07)',
    border: '1px solid #e8edf5',
  },
  title: {
    margin: '0 0 20px',
    fontSize: 16,
    fontWeight: 700,
    color: '#1a3a6b',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 12,
  },
  dayCard: {
    background: '#f8fafc',
    borderRadius: 12,
    padding: '14px 8px',
    textAlign: 'center',
    border: '1px solid #e8edf5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  dayName: {
    fontSize: 11,
    fontWeight: 700,
    color: '#1a3a6b',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  icon: { width: 48, height: 48 },
  desc: {
    fontSize: 10,
    color: '#888',
    textTransform: 'capitalize',
    lineHeight: 1.2,
    minHeight: 24,
  },
  temp: {
    fontSize: 22,
    fontWeight: 800,
    color: '#1a3a6b',
  },
  minmax: {
    fontSize: 11,
    fontWeight: 600,
  },
  humidity: {
    fontSize: 11,
    color: '#666',
  },
};
