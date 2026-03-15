// File: src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global reset styles
const style = document.createElement('style');
style.textContent = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f4f6fb;
    color: #222;
  }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
  table tr:hover { background: #f8faff; }
  input:focus { border-color: #1a3a6b !important; }
`;
document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
