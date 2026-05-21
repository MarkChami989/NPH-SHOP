import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Validation basic check
    if (!username || !password) {
      setError('⚠️ Please enter both your username and password.');
      return;
    }

    setLoading(true);

    try {
      // 🚀 2. Fetch API call directly to your real backend server (Soon to be active)
      // Note: Eza 3am testa3mel l-telephone, beddal localhost la-IP l-laptop (masalan: 192.168.1.X:5000)
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // 3. Eza l-backend rej3it error (user mesh moujoud aw password ghalat)
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // 4. Success Login! Sayyaf data bl-localStorage seamlessly metel ma baddak
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', data.user.username);
      
      const userProfile = {
        id: data.user.username,
        email: data.user.email,
        number: data.user.number,
        location: data.user.location,
        wishlistCount: data.user.wishlistCount || 0
      };
      
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      
      // 5. Land flawlessly on the Home Screen!
      navigate('/');

    } catch (err) {
      // Show database / validation error live on screen banner
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper animate-fade-in">
      <div className="login-card-container">
        
        {/* Brand Terminal Header */}
        <div className="login-brand-header">
          <h1 className="login-logo">🛒 NPH SHOP</h1>
          <p className="login-subtitle">Management System Terminal Access</p>
        </div>

        {/* Error Notification Alert Banner */}
        {error && <div className="login-error-banner">{error}</div>}

        {/* Core Input Credentials Fields */}
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
              required
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
              required
            />
          </div>

          <button type="submit" className="login-submit-action-btn" disabled={loading}>
            {loading ? 'Authenticating Secure Node...' : 'Secure Login ➔'}
          </button>
        </form>

        {/* --- 🛠️ LINKED SIGN IN REGISTRATION ACTION BAR --- */}
        <div className="login-registration-gate">
          <p className="login-gate-text">New terminal user on this machine?</p>
          <button 
            type="button" 
            className="login-signin-action-btn"
            onClick={() => navigate('/register')}
          >
            Create Account & Sign In 👤
          </button>
        </div>

        <div className="login-card-footer">
          <Link to="/" className="cancel-return-link">Cancel & Exit Terminal</Link>
        </div>

      </div>
    </div>
  );
}