import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; // Uses your clean theme stylesheet

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 1. STRICT INTEGRITY CHECK
    // Must fill out all fields to successfully create both nodes together
    if (!username || !password || !email || !phone || !location) {
      setError('⚠️ Strict Policy Lock: You MUST complete all profile fields (Email, Phone, Location) to create a user account!');
      return;
    }

    if (phone.length < 8) {
      setError('⚠️ Phone number must be at least 8 digits.');
      return;
    }

    setLoading(true);

    // Simulated network authentication delay
    setTimeout(() => {
      setLoading(false);

      // 2. Build the user auth credentials node
      const newUserAccount = {
        username: username.toLowerCase(),
        password: password, 
      };

      // 3. Build the profile configuration object with default initial ID
      const userProfileMetrics = {
        id: 'NPH-01', // Starts dynamically from 01
        email: email,
        number: phone,
        location: location,
        wishlistCount: 0
      };

      // Atomic Save: Write both blocks to localStorage instantly
      localStorage.setItem('userAccount', JSON.stringify(newUserAccount));
      localStorage.setItem('userProfile', JSON.stringify(userProfileMetrics));
      
      // Initialize active authenticated session tokens
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);

      alert('🎉 Account and Profile created successfully together!');
      
      // Direct pass to dashboard terminal
      navigate('/');
    }, 1500);
  };

  return (
    <div className="login-page-wrapper animate-fade-in">
      <div className="login-card-container" style={{ maxWidth: '480px' }}>
        
        <div className="login-brand-header">
          <h1 className="login-logo">🛒 NPH SHOP</h1>
          <p className="login-subtitle">Create Account & Profile Terminal</p>
        </div>

        {error && <div className="login-error-banner">{error}</div>}

        <form onSubmit={handleRegisterSubmit} className="login-form-element">
          
          {/* --- SECTION 1: ACCOUNT CREDENTIALS --- */}
          <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '0.5rem' }}>
            <h3 style={{ margin: '0 0 0.75rem 0', color: '#1e293b', fontSize: '1rem' }}>1. Login Credentials</h3>
            
            <div className="login-input-group" style={{ marginBottom: '0.75rem' }}>
              <label className="login-input-label">Select Username</label>
              <input 
                type="text" 
                placeholder="e.g. marc98" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-field-input"
                disabled={loading}
              />
            </div>

            <div className="login-input-group">
              <label className="login-input-label">Select Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-field-input"
                disabled={loading}
              />
            </div>
          </div>

          {/* --- SECTION 2: PROFILE LOGGING METRICS --- */}
          <div>
            <h3 style={{ margin: '0 0 0.75rem 0', color: '#1e293b', fontSize: '1rem' }}>2. Profile Initial Data</h3>

            <div className="login-input-group" style={{ marginBottom: '0.75rem' }}>
              <label className="login-input-label">Email Address</label>
              <input 
                type="email" 
                placeholder="name@nphhub.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-field-input"
                disabled={loading}
              />
            </div>

            <div className="login-input-group" style={{ marginBottom: '0.75rem' }}>
              <label className="login-input-label">Contact Phone Number</label>
              <input 
                type="tel" 
                placeholder="e.g. 71123456" 
                maxLength="8"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="login-field-input"
                disabled={loading}
              />
            </div>

            <div className="login-input-group">
              <label className="login-input-label">Branch Location Branch</label>
              <input 
                type="text" 
                placeholder="e.g. Tripoli, Lebanon" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="login-field-input"
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="login-submit-action-btn" style={{ marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Registering Terminal Nodes...' : 'Complete Registration & Profile ➔'}
          </button>
        </form>

        <div className="login-card-footer">
          <Link to="/login" className="cancel-return-link">Already have an account? Login</Link>
        </div>

      </div>
    </div>
  );
}