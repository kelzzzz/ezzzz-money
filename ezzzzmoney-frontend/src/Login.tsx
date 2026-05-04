import React, { useState } from 'react';
import './Login.css';
import { authService } from './Api';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(email, password);
      if (response.status === 200) {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userEmail', response.data.email);
        onLogin();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-glow" />
      <div className="login-card">
        <div className="login-brand">
          <span className="login-brand-icon">💸</span>
          <h1 className="login-brand-name">EzzzMoney</h1>
          <p className="login-brand-tagline">Your financial health, on autopilot.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label" htmlFor="email">Email</label>
            <input
              className="login-input"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="password">Password</label>
            <input
              className="login-input"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="login-signup">
          Don't have an account? <span className="login-link">Sign up</span>
        </p>

        <p style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
          Test credentials:<br />
          Email: user1@example.com | Password: password123<br />
          Email: user2@example.com | Password: password456
        </p>
      </div>
    </div>
  );
};

export default Login;