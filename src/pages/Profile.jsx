import { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const storedUsername = localStorage.getItem('username');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    number: '',
    location: ''
  });

  // 🚀 1. LOAD DYNAMIC PROFILE FROM MYSQL ON MOUNT
  useEffect(() => {
    if (!isLoggedIn || !storedUsername) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:5000/api/user/${storedUsername}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to synchronize profile node.');
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUser(data.user);
          setForm({
            username: data.user.username,
            password: data.user.password || '', 
            email: data.user.email,
            number: data.user.number,
            location: data.user.location
          });
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [storedUsername, isLoggedIn, navigate]);

  // 🚀 2. SUBMIT MODIFICATIONS STRAIGHT TO NODE/MYSQL (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentUsername: storedUsername,
          username: form.username,
          password: form.password,
          email: form.email,
          number: form.number,
          location: form.location
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to update database profile.');

      // Sync local identifiers only kermel routing continuity layout
      localStorage.setItem('username', form.username.toLowerCase().trim());
      
      setUser({
        ...user,
        username: form.username,
        password: form.password,
        email: form.email,
        number: form.number,
        location: form.location
      });

      setEditMode(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);

    } catch (err) {
      setError(`❌ Update Error: ${err.message}`);
    }
  };

  // 🚀 3. WIPE DATA FROM MYSQL FOREVER (DELETE)
  const handleDeleteAccount = async () => {
    const confirmWipeout = window.confirm(
      "⚠️ WARNING: Are you completely sure you want to delete this profile? This will erase your account from the MySQL server permanently!"
    );

    if (!confirmWipeout) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/user/delete/${storedUsername}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to delete account from server.');

      // Clear local session storage completely
      localStorage.removeItem('userProfile');
      localStorage.removeItem('userAccount');
      localStorage.removeItem('username');
      localStorage.setItem('isLoggedIn', 'false');

      alert("🗑️ Profile successfully purged mnel MySQL database!");
      navigate('/login');

    } catch (err) {
      setError(`❌ Deletion Error: ${err.message}`);
      setIsDeleting(false);
    }
  };

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (loading) return <div className="profile-loading-banner">Syncing profile credentials with MySQL...</div>;

  return (
    <div className="profile-page-wrapper animate-fade-in">
      <div className="profile-card-container">

        <div className="profile-brand-header">
          <h1 className="profile-logo">🛒 NPH SHOP</h1>
          <p className="profile-subtitle">User Profile Terminal</p>
        </div>

        {error && <div className="profile-error-banner">{error}</div>}
        {saved && <div className="profile-success-banner">✅ Profile and Credentials updated in MySQL successfully.</div>}

        {!editMode ? (
          <>
            <div className="profile-avatar-block">
              <div className="profile-avatar-circle">👤</div>
              <span className="profile-id-badge">{user?.nph_id || 'NPH-USER'}</span>
            </div>

            <div className="profile-info-grid">
              <div className="profile-info-row profile-info-row-highlight">
                <span className="profile-info-label-highlight">Account Username</span>
                <span className="profile-info-value-highlight">{user?.username}</span>
              </div>

              <div className="profile-info-row">
                <span className="profile-info-label">Email Address</span>
                <span className="profile-info-value">{user?.email || 'Not Specified'}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Phone Number</span>
                <span className="profile-info-value">{user?.number || 'Not Specified'}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Location</span>
                <span className="profile-info-value">{user?.location || 'Not Specified'}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Wishlist</span>
                <span className="profile-info-value">{user?.wishlistCount || 0} Items</span>
              </div>
            </div>

            <div className="profile-actions-wrapper">
              <button type="button" className="profile-action-btn" onClick={() => setEditMode(true)}>
                Modify Profile Metrics & Keys
              </button>
              
              <button 
                type="button" 
                className="profile-delete-btn" 
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? 'Wiping Profile Database Nodes...' : 'Delete Account & Profile ⚠️'}
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="profile-edit-form">
            
            <div className="profile-security-section">
              <h4 className="profile-section-title">Security Access Parameters</h4>
              
              <div className="profile-input-group">
                <label className="profile-input-label">Update Username</label>
                <input
                  type="text"
                  className="profile-field-input"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>

              <div className="profile-input-group">
                <label className="profile-input-label">Update Password</label>
                <input
                  type="password"
                  className="profile-field-input"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="profile-input-group">
              <label className="profile-input-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="profile-field-input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="profile-input-group">
              <label className="profile-input-label" htmlFor="number">Contact Phone Number</label>
              <input
                id="number"
                type="text"
                className="profile-field-input"
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                required
              />
            </div>

            <div className="profile-input-group">
              <label className="profile-input-label" htmlFor="location">Branch Location</label>
              <input
                id="location"
                type="text"
                className="profile-field-input"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="profile-action-btn">Save Modifications</button>
            <button type="button" className="profile-cancel-btn" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </form>
        )}

        <div className="profile-card-footer">
          <Link to="/" className="profile-back-link">← Back to Home</Link>
        </div>

      </div>
    </div>
  );
}