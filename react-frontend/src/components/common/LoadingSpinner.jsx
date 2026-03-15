// File: src/components/common/LoadingSpinner.jsx
export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.spinner} />
      <p style={styles.text}>{message}</p>
    </div>
  );
}

const styles = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    gap: 16,
  },
  spinner: {
    width: 42,
    height: 42,
    border: '4px solid #e0e7ef',
    borderTop: '4px solid #1a3a6b',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  text: {
    color: '#888',
    fontSize: 14,
    margin: 0,
  },
};

// Inject keyframe once
if (!document.getElementById('spinner-style')) {
  const style = document.createElement('style');
  style.id = 'spinner-style';
  style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(style);
}
