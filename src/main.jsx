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
        <div style={{ padding: 40, background: '#000', color: '#fff', fontFamily: 'monospace', minHeight: '100vh' }}>
          <h2 style={{ color: '#D1FE17', fontSize: 24, marginBottom: 16 }}>⚠️ Application Error</h2>
          <pre style={{ background: '#111', padding: 20, borderRadius: 8, overflowX: 'auto', color: '#ef4444' }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            style={{ marginTop: 20, padding: '10px 20px', background: '#D1FE17', color: '#000', border: 'none', borderRadius: 20, fontWeight: 'bold', cursor: 'pointer' }}
          >
            Reload Page
          </button>
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
