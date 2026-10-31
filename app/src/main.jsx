import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error Caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Nunito, sans-serif',
          background: 'linear-gradient(to bottom, #fffbeb, #fff1f2)',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '24px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            maxWidth: '480px',
            border: '3px solid #fde68a'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎨</div>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#e11d48', margin: '0 0 8px 0' }}>
              Đang Nâng Cấp Phiên Bản Mới
            </h2>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.6', marginBottom: '20px' }}>
              Ứng dụng vừa cập nhật giọng Cô Hoài My và chế độ giảng bài tự động. Bạn vui lòng bấm nút bên dưới để tải bản mới nhất nhé!
            </p>
            <button
              onClick={() => {
                if ('caches' in window) {
                  caches.keys().then((names) => {
                    Promise.all(names.map((name) => caches.delete(name))).then(() => {
                      window.location.reload();
                    });
                  });
                } else {
                  window.location.reload();
                }
              }}
              style={{
                background: 'linear-gradient(to right, #f43f5e, #fb923c)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '16px',
                fontWeight: '900',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              🔄 Tải Lại Bản Mới Nhất
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
  </React.StrictMode>
);
