// File: src/components/weather/WeatherWidget.jsx
import { useState, useEffect } from 'react';
import { getWeatherByCity, getForecastByCity, getWeatherByCoords, getForecastByCoords, getWeatherIconUrl } from '../../services/weatherApi';
import ForecastDisplay from './ForecastDisplay';
import LoadingSpinner from '../common/LoadingSpinner';

export default function WeatherWidget() {
  const [city, setCity] = useState('Davao City');
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWeather('Davao City');
  }, []);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const [w, f] = await Promise.all([
        getWeatherByCity(cityName),
        getForecastByCity(cityName),
      ]);
      setWeather(w);
      setCity(cityName);
      // Group forecast by day (take one per day at noon)
      const daily = {};
      f.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!daily[date]) daily[date] = item;
      });
      setForecast(Object.values(daily).slice(0, 5));
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const [w, f] = await Promise.all([
            getWeatherByCoords(coords.latitude, coords.longitude),
            getForecastByCoords(coords.latitude, coords.longitude),
          ]);
          setWeather(w);
          setCity(w.name);
          const daily = {};
          f.list.forEach((item) => {
            const date = item.dt_txt.split(' ')[0];
            if (!daily[date]) daily[date] = item;
          });
          setForecast(Object.values(daily).slice(0, 5));
        } catch (err) {
          setError('Failed to get weather for your location.');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Location access denied.');
        setLoading(false);
      }
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) fetchWeather(search.trim());
  };

  if (loading) return <LoadingSpinner message="Fetching weather data..." />;

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>🌤️ Weather Forecast</h1>
          <p style={styles.pageSub}>Real-time weather powered by OpenWeatherMap</p>
        </div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchArea}>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search city (e.g., Davao City, Manila)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>🔍 Search</button>
        </form>
        <button onClick={handleGeolocate} style={styles.geoBtn}>📍 My Location</button>
      </div>

      {error && (
        <div style={styles.errorBox}>⚠️ {error}</div>
      )}

      {weather && (
        <div style={styles.weatherGrid}>
          {/* Current Weather Card */}
          <div style={styles.currentCard}>
            <div style={styles.currentTop}>
              <div>
                <div style={styles.cityName}>📍 {weather.name}, {weather.sys.country}</div>
                <div style={styles.weatherDesc}>{weather.weather[0].description}</div>
              </div>
              <img
                src={getWeatherIconUrl(weather.weather[0].icon)}
                alt={weather.weather[0].description}
                style={styles.weatherIcon}
              />
            </div>
            <div style={styles.tempDisplay}>{Math.round(weather.main.temp)}°C</div>
            <div style={styles.feelsLike}>Feels like {Math.round(weather.main.feels_like)}°C</div>

            <div style={styles.detailsGrid}>
              <div style={styles.detailItem}>
                <span style={styles.detailIcon}>💧</span>
                <span style={styles.detailLabel}>Humidity</span>
                <span style={styles.detailValue}>{weather.main.humidity}%</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailIcon}>💨</span>
                <span style={styles.detailLabel}>Wind</span>
                <span style={styles.detailValue}>{weather.wind.speed} m/s</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailIcon}>🌡️</span>
                <span style={styles.detailLabel}>Min / Max</span>
                <span style={styles.detailValue}>
                  {Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°
                </span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailIcon}>👁️</span>
                <span style={styles.detailLabel}>Visibility</span>
                <span style={styles.detailValue}>{((weather.visibility || 0) / 1000).toFixed(1)} km</span>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <ForecastDisplay forecast={forecast} />
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
  pageHeader: { marginBottom: 24 },
  pageTitle: { margin: 0, fontSize: 24, fontWeight: 800, color: '#1a3a6b' },
  pageSub: { margin: '4px 0 0', fontSize: 13, color: '#888' },
  searchArea: {
    display: 'flex',
    gap: 12,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  searchForm: { display: 'flex', gap: 8, flex: 1, minWidth: 280 },
  searchInput: {
    flex: 1,
    padding: '11px 16px',
    border: '1.5px solid #dde3ef',
    borderRadius: 8,
    fontSize: 14,
    outline: 'none',
    fontFamily: "'Segoe UI', sans-serif",
    background: '#fff',
    color: '#222',
  },
  searchBtn: {
    background: '#1a3a6b',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '11px 20px',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "'Segoe UI', sans-serif",
  },
  geoBtn: {
    background: '#fff',
    color: '#1a3a6b',
    border: '1.5px solid #1a3a6b',
    borderRadius: 8,
    padding: '11px 18px',
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
  weatherGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: 20,
  },
  currentCard: {
    background: 'linear-gradient(160deg, #1a3a6b 0%, #0d2347 100%)',
    borderRadius: 16,
    padding: '28px',
    color: '#fff',
  },
  currentTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cityName: { fontSize: 16, fontWeight: 700, marginBottom: 4 },
  weatherDesc: { fontSize: 13, color: 'rgba(255,255,255,0.7)', textTransform: 'capitalize' },
  weatherIcon: { width: 64, height: 64 },
  tempDisplay: { fontSize: 64, fontWeight: 900, lineHeight: 1, color: '#f0d080' },
  feelsLike: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 4, marginBottom: 24 },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  detailItem: {
    background: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '10px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  detailIcon: { fontSize: 18 },
  detailLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  detailValue: { fontSize: 14, fontWeight: 700 },
};
