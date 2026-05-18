import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';

const defaultProfile = {
  id: 'NPH-01',
  email: 'maroun@nphhub.com',
  number: '71123456',
  location: 'Zgharta, Lebanon',
  wishlistCount: 3,
};

export default function Profile() {
  const navigate = useNavigate();
  
  // 1. CRITICAL SESSION CHECK: Verify if authentication token exists
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // 2. Load account credentials safely from cache storage
  const [account, setAccount] = useState(() => {
    try {
      const savedAcc = localStorage.getItem('userAccount');
      return savedAcc ? JSON.parse(savedAcc) : { username: 'admin', password: 'defaultPassword123' };
    } catch (e) {
      return { username: 'admin', password: 'defaultPassword123' };
    }
  });

  // Initialize profile data safely
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('userProfile');
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch (error) {
      console.error("Failed to parse userProfile data:", error);
      return defaultProfile;
    }
  });

  const [editMode, setEditMode] = useState(false);
  
  // Bind both credentials and profile fields together inside our interactive form state
  const [form, setForm] = useState({
    username: account ? account.username : '',
    password: account ? account.password : '',
    email: profile ? profile.email : '',
    number: profile ? profile.number : '',
    location: profile ? profile.location : ''
  });
  
  const [saved, setSaved] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // Handles loading state during wipeout

  // Sync state variables whenever profile or credentials nodes change
  useEffect(() => {
    if (profile && account) {
      setForm({
        username: account.username,
        password: account.password,
        email: profile.email,
        number: profile.number,
        location: profile.location
      });
    }
  }, [profile, account]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) return;

    const updatedAccount = {
      username: form.username.toLowerCase(),
      password: form.password
    };

    const updatedProfile = {
      ...profile,
      email: form.email,
      number: form.number,
      location: form.location
    };

    setAccount(updatedAccount);
    setProfile(updatedProfile);
    
    localStorage.setItem('userAccount', JSON.stringify(updatedAccount));
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    localStorage.setItem('username', form.username);
    
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // --- 🛠️ DYNAMIC DELETION LOGIC ENGINE (CRASH PROOF) ---
  const handleDeleteAccount = () => {
    const confirmWipeout = window.confirm(
      "⚠️ WARNING: Are you completely sure you want to delete this profile and user account? This will erase all localized system datasets permanently!"
    );

    if (confirmWipeout) {
      setIsDeleting(true);

      // 1. Wipe core persistent storage drives immediately
      localStorage.removeItem('userProfile');
      localStorage.removeItem('userAccount');
      localStorage.removeItem('username');
      localStorage.setItem('isLoggedIn', 'false'); // Lock access gates

      setTimeout(() => {
        setIsDeleting(false);
        alert("🗑️ Profile data successfully wiped from core network node repositories.");
        
        // 2. Safe Local memory state clearing right before kicking the user out
        setProfile(null);
        setAccount(null);
        
        // 3. Kick to login panel
        navigate('/login');
      }, 1000);
    }
  };

  // 3. CRASH GATEKEEPER - Acts as an instant fallback shield if data goes missing or is deleted
  if (!isLoggedIn || !profile || !account) {
    return (
      <div className="profile-page-wrapper animate-fade-in">
        <div className="profile-card-container restriction-box" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>⚠️</div>
          <h2 style={{ color: '#1e293b', fontWeight: '800', margin: '0 0 0.5rem 0' }}>Access Denied</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.5' }}>
            No active terminal session detected. You must be logged in to access and manage profile database parameters.
          </p>
          <Link to="/login" className="profile-action-btn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
            Go to Login Page ➔
          </Link>
          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/" style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '600', textDecoration: 'none' }}>
              Return to Terminal Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page-wrapper animate-fade-in">
      <div className="profile-card-container">

        <div className="profile-brand-header">
          <h1 className="profile-logo">🛒 NPH SHOP</h1>
          <p className="profile-subtitle">User Profile Terminal</p>
        </div>

        {saved && (
          <div className="profile-success-banner">✅ Profile and Credentials updated successfully.</div>
        )}

        {!editMode ? (
          <>
            <div className="profile-avatar-block">
              <div className="profile-avatar-circle">👤</div>
              <span className="profile-id-badge">{profile.id}</span>
            </div>

            <div className="profile-info-grid">
              <div className="profile-info-row" style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '6px' }}>
                <span className="profile-info-label" style={{ color: '#3b82f6', fontWeight: '700' }}>Account Username</span>
                <span className="profile-info-value" style={{ fontWeight: '800' }}>{account.username}</span>
              </div>
              <div className="profile-info-row" style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '6px', marginBottom: '0.5rem' }}>
                <span className="profile-info-label" style={{ color: '#3b82f6', fontWeight: '700' }}>Active Password</span>
                <span className="profile-info-value" style={{ fontFamily: 'monospace', letterSpacing: '1px' }}>{account.password}</span>
              </div>

              <div className="profile-info-row">
                <span className="profile-info-label">Email Address</span>
                <span className="profile-info-value">{profile.email || 'Not Specified'}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Phone Number</span>
                <span className="profile-info-value">{profile.number || 'Not Specified'}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Location</span>
                <span className="profile-info-value">{profile.location || 'Not Specified'}</span>
              </div>
              <div className="profile-info-row">
                <span className="profile-info-label">Wishlist</span>
                <span className="profile-info-value">{profile.wishlistCount} Items</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" className="profile-action-btn" onClick={() => setEditMode(true)}>
                Modify Profile Metrics & Keys
              </button>
              
              <button 
                type="button" 
                className="profile-delete-btn" 
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease-in-out'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                {isDeleting ? 'Wiping Profile Database Nodes...' : 'Delete Account & Profile ⚠️'}
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="profile-edit-form">
            
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', color: '#1e293b' }}>Security Access Parameters</h4>
              
              <div className="profile-input-group" style={{ marginBottom: '0.75rem' }}>
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
                  type="text"
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