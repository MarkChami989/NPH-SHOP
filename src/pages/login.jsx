import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('⚠️ Please enter both your username and password.');
      return;
    }

    setLoading(true);

    // Simulate secure network authentication delay
    setTimeout(() => {
      setLoading(false);
      
      // Local authentication check logic
      if (username.toLowerCase() === 'admin' && password === 'nph123') {
        // Save auth state to localStorage so other pages can check it
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        // Securely redirect back to the home terminal dashboard
        navigate('/');
      } else {
        setError('❌ Invalid credentials! Try admin / nph123 for testing.');
      }
    }, 1500);
  };

  return (
    <div className="login-page-wrapper animate-fade-in">
      <div className="login-card-container">
        
        {/* Brand Header */}
        <div className="login-brand-header">
          <h1 className="login-logo">🛒 NPH SHOP</h1>
          <p className="login-subtitle">Management System Terminal Access</p>
        </div>

        {/* Error Notification Alert */}
        {error && <div className="login-error-banner">{error}</div>}

        {/* Form Inputs Grid */}
        <form onSubmit={handleLoginSubmit} className="login-form-element">
          <div className="login-input-group">
            <label className="login-input-label">Username / اسم المستخدم</label>
            <input 
              type="text" 
              placeholder="Enter your terminal username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-field-input"
              disabled={loading}
            />
          </div>

          <div className="login-input-group">
            <label className="login-input-label">Password / كلمة المرور</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-field-input"
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-submit-action-btn" disabled={loading}>
            {loading ? 'Authenticating Secure Node...' : 'Secure Login ➔'}
          </button>
        </form>

        {/* Optional Back Navigation links footer */}
        <div className="login-card-footer">
          <Link to="/" className="cancel-return-link">Cancel & Exit Terminal</Link>
        </div>

      </div>
    </div>
  );
}