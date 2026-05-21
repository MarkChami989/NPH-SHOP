import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { username, password, email, phone, location } = form;

    if (!username || !password || !email || !phone || !location) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, number: phone, location }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed.');
        return;
      }

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('userProfile', JSON.stringify(data.profile));

      navigate('/');

    } catch (err) {
      setError('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper animate-fade-in">
      <div className="login-card-container" style={{ maxWidth: '460px' }}>

        <div className="login-brand-header">
          <h1 className="login-logo">NPH SHOP</h1>
          <p className="login-subtitle">Create New Account</p>
        </div>

        {error && <div className="login-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form-element">

          <div className="login-input-group">
            <label className="login-input-label">Username</label>
            <input
              type="text"
              name="username"
              placeholder="e.g. marc98"
              value={form.username}
              onChange={handleChange}
              className="login-field-input"
              disabled={loading}
            />
          </div>

          <div className="login-input-group">
            <label className="login-input-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="login-field-input"
              disabled={loading}
            />
          </div>

          <div className="login-input-group">
            <label className="login-input-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              className="login-field-input"
              disabled={loading}
            />
          </div>

          <div className="login-input-group">
            <label className="login-input-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. 71234567"
              value={form.phone}
              onChange={handleChange}
              className="login-field-input"
              disabled={loading}
            />
          </div>

          <div className="login-input-group">
            <label className="login-input-label">Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Tripoli, Lebanon"
              value={form.location}
              onChange={handleChange}
              className="login-field-input"
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-submit-action-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>

        </form>

        <div className="login-card-footer">
          <Link to="/login" className="cancel-return-link">Already have an account? Login</Link>
        </div>

      </div>
    </div>
  );
}
