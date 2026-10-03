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
        <div style={{ padding: 40, background: '#F8FAFC', color: '#0B0D12', fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: 560, width: '100%', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 16, padding: 32, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#0B0D12', fontSize: 20, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>⚠️</span>
              <span>Application Notice</span>
            </h2>
            <p style={{ color: '#64748B', fontSize: 13, marginBottom: 16 }}>
              A client-side runtime exception occurred. Click below to reload the workspace.
            </p>
            <pre style={{ background: '#F1F5F9', border: '1px solid #E2E8F0', padding: 14, borderRadius: 10, overflowX: 'auto', color: '#DC2626', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
              {this.state.error?.toString()}
            </pre>
            <button 
              onClick={() => {
                localStorage.removeItem('vyralify-theme');
                localStorage.setItem('vyralify-theme-v3', 'light');
                window.location.reload();
              }} 
              style={{ marginTop: 20, padding: '10px 20px', background: '#16A34A', color: '#FFFFFF', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
            >
              Reload Workspace
            </button>
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
