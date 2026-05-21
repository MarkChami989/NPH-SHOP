import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './setting.css';

export default function Setting() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const [shopName, setShopName] = useState(localStorage.getItem('shopName') || 'NPH SHOP');
  const [shopLocation, setShopLocation] = useState(localStorage.getItem('shopLocation') || '');
  const [shopPhone, setShopPhone] = useState(localStorage.getItem('shopPhone') || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('shopName', shopName);
    localStorage.setItem('shopLocation', shopLocation);
    localStorage.setItem('shopPhone', shopPhone);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userProfile');
    navigate('/login');
  };

  return (
    <div className="setting-page-wrapper">
      <div className="setting-card">

        <div className="setting-header">
          <h1 className="setting-logo">⚙️ NPH SHOP</h1>
          <p className="setting-subtitle">Settings Panel</p>
        </div>

        {saved && <div className="setting-success">✅ Settings saved successfully.</div>}

        <form onSubmit={handleSave}>

          <div className="setting-section">
            <h3 className="setting-section-title">Shop Info</h3>

            <div className="setting-group">
              <label className="setting-label">Shop Name</label>
              <input
                type="text"
                className="setting-input"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Shop Location</label>
              <input
                type="text"
                className="setting-input"
                value={shopLocation}
                onChange={(e) => setShopLocation(e.target.value)}
                placeholder="e.g. Beirut, Lebanon"
              />
            </div>

            <div className="setting-group">
              <label className="setting-label">Shop Phone</label>
              <input
                type="text"
                className="setting-input"
                value={shopPhone}
                onChange={(e) => setShopPhone(e.target.value)}
                placeholder="e.g. 01 234 567"
              />
            </div>
          </div>

          <div className="setting-section">
            <h3 className="setting-section-title">Account</h3>
            <div className="setting-info-row">
              <span className="setting-info-label">Logged in as</span>
              <span className="setting-info-value">👤 {username}</span>
            </div>
            <Link to="/profile" className="setting-profile-link">Manage Profile & Password →</Link>
          </div>

          <button type="submit" className="setting-save-btn">Save Settings</button>
        </form>

        <div className="setting-footer">
          <Link to="/" className="setting-back-link">← Back to Home</Link>
          <button onClick={handleLogout} className="setting-logout-btn">Logout</button>
        </div>

      </div>
    </div>
  );
}
