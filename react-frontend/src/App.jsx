// File: src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Students from './components/students/Students';
import Courses from './components/courses/Courses';
import WeatherWidget from './components/weather/WeatherWidget';
import Navbar from './components/common/Navbar';
import ErrorBoundary from './components/common/ErrorBoundary';

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return (
    <>
      <Navbar />
      <ErrorBoundary>{children}</ErrorBoundary>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/students"
          element={<ProtectedRoute><Students /></ProtectedRoute>}
        />
        <Route
          path="/courses"
          element={<ProtectedRoute><Courses /></ProtectedRoute>}
        />
        <Route
          path="/weather"
          element={<ProtectedRoute><WeatherWidget /></ProtectedRoute>}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
