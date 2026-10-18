import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Vyralify caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, background: '#08090C', color: '#F1F5F9', fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: 560, width: '100%', background: '#0D0F14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 32, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>⚠️</span>
              <span>Application Notice</span>
            </h2>
            <p style={{ color: '#94A3B8', fontSize: 13, marginBottom: 16 }}>
              A client-side runtime exception occurred. Click below to reload with fresh cache.
            </p>
            <pre style={{ background: '#161922', border: '1px solid rgba(255,255,255,0.06)', padding: 14, borderRadius: 10, overflowX: 'auto', color: '#EF4444', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
              {this.state.error?.toString()}
            </pre>
            <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <button 
                onClick={() => {
                  window.location.href = window.location.origin + window.location.pathname + '?refresh=' + Date.now();
                }} 
                style={{ padding: '10px 20px', background: '#23E598', color: '#0A0A0A', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                Reload Workspace (Fresh Cache)
              </button>
              <button 
                onClick={() => {
                  try {
                    localStorage.clear();
                    sessionStorage.clear();
                  } catch (e) {}
                  window.location.href = window.location.origin + '?reset=' + Date.now();
                }} 
                style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, fontWeight: 500, fontSize: 13, cursor: 'pointer' }}
              >
                Clear Cache & Reopen
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
