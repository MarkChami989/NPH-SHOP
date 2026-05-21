import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './alfa-mtc.css';

const alfaBundles = [
  { id: 'a1', price: '$3.03', img: 'alfa-mtc/alfa3.jpg' },
  { id: 'a2', price: '$4.50', img: 'alfa-mtc/alfa4.jpg' },
  { id: 'a3', price: '$7.58', img: 'alfa-mtc/alfa7.jpg' },
  { id: 'a4', price: '$7.50', img: 'alfa-mtc/alfa7.5.jpg' },
  { id: 'a5', price: '$10', img: 'alfa-mtc/alfa10.jpg' },
  { id: 'a6', price: '$15.15', img: 'alfa-mtc/alfa15.jpg' },
  { id: 'a7', price: '$22.73', img: 'alfa-mtc/alfa22.jpg' },
  { id: 'a8', price: '$77.28', img: 'alfa-mtc/alfa77.jpg' },
];

const mtcBundles = [
  { id: 'm1', price: '$3.00', img: 'alfa-mtc/mtc4.5.jpg' },
  { id: 'm2', price: '$7.58', img: 'alfa-mtc/mtc7.jpg' },
  { id: 'm3', price: '$10.00', img: 'alfa-mtc/mtc10.jpg' },
  { id: 'm4', price: '$15.15', img: 'alfa-mtc/mtc15.jpg' },
  { id: 'm5', price: '$22.73', img: 'alfa-mtc/mtc22.jpg' },
  { id: 'm6', price: '$77.28', img: 'alfa-mtc/mtc77.jpg' },
];

export default function AlfaMtc() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [selectedCardId, setSelectedCardId] = useState(null);
  
  const navigate = useNavigate();

  const handleRecharge = async (id, price, type) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUsername = localStorage.getItem('username');

    setErrorMessage('');
    setSuccessMessage('');

    if (!isLoggedIn || !storedUsername) {
      setErrorMessage('⚠️ Access Denied: No active session found. Please log in first.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!phoneNumber || phoneNumber.trim().length < 8) {
      alert('Please enter a valid 8-digit phone number first! / رجاءً أدخل رقم الهاتف أولاً');
      return;
    }

    setSelectedCardId(id);
    setLoading(true);

    try {
      // 🚀 2. SEND THE RECHARGE TRANSACTION LOG STRAIGHT TO NODE SERVER (MYSQL)
      const response = await fetch('http://localhost:5000/api/recharge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: storedUsername,
          phoneNumber: phoneNumber,
          provider: type, // 'Alfa' aw 'Touch'
          price: price
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to dispatch reload sequence to server db.');
      }

      // 3. Success Feedback dynamic clear layout
      setSuccessMessage(`Successfully processed ${type} ${price} recharge for number: ${phoneNumber}!`);
      setPhoneNumber('');
      
    } catch (err) {
      setErrorMessage(`❌ Gateway Fail: ${err.message}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
      setSelectedCardId(null);
    }
  };

  return (
    <div className="telecom-page-wrapper">
      
      {/* Top Navigation Header Area */}
      <div className="telecom-nav-header">
        <Link to="/" className="back-btn-link">← Back to Dashboard</Link>
        <h2 className="portal-main-title">NPH Telecom Gateway</h2>
        
        {/* Real Status Track indicators without manual toggle switches */}
        <div className="test-auth-toggle">
          <span className={`status-text ${localStorage.getItem('isLoggedIn') === 'true' ? 'logged-in' : 'logged-out'}`}>
            Operator: {localStorage.getItem('isLoggedIn') === 'true' ? `👤 ${localStorage.getItem('username')}` : '❌ Disconnected'}
          </span>
        </div>
      </div>

      {/* Target Number Sticky Field Input */}
      <div className="phone-sticky-input-container">
        <div className="phone-field-box">
          <label className="phone-label">Target Phone Number / رقم الهاتف :</label>
          <input 
            type="tel" 
            placeholder="e.g. 03123456 or 76123456"
            maxLength="8"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="phone-main-input"
            disabled={loading}
          />
        </div>
      </div>

      {/* Error / Alert Warning Feedback Box */}
      {errorMessage && (
        <div className="gateway-error-alert">
          <div className="error-alert-content">
            <p>{errorMessage}</p>
            {localStorage.getItem('isLoggedIn') !== 'true' && <Link to="/login" className="alert-login-link-btn">Go to Login Page ➔</Link>}
          </div>
        </div>
      )}

      {/* Success Transaction Feedback Alert */}
      {successMessage && <div className="gateway-success-alert">{successMessage}</div>}

      {/* --- SECTION 1: ALFA RECHARGE --- */}
      <div className="section-title-banner alfa-banner-bg">Alfa Recharge</div>
      
      <div className="telecom-cards-grid">
        {alfaBundles.map((card) => (
          <div className="telecom-product-card" key={card.id}>
            <div className="card-img-frame">
              <img src={card.img} alt={`Alfa ${card.price}`} className="card-display-img" />
            </div>
            <div className="card-bottom-actions">
              <div className="card-price-display">{card.price}</div>
              <button 
                className="card-action-btn alfa-btn"
                onClick={() => handleRecharge(card.id, card.price, 'Alfa')}
                disabled={loading}
              >
                {loading && selectedCardId === card.id ? '...' : 'Recharge'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- SECTION 2: TOUCH RECHARGE --- */}
      <div className="section-title-banner mtc-banner-bg">Touch (MTC) Recharge</div>

      <div className="telecom-cards-grid">
        {mtcBundles.map((card) => (
          <div className="telecom-product-card" key={card.id}>
            <div className="card-img-frame">
              <img src={card.img} alt={`Touch ${card.price}`} className="card-display-img" />
            </div>
            <div className="card-bottom-actions">
              <div className="card-price-display">{card.price}</div>
              <button 
                className="card-action-btn mtc-btn"
                onClick={() => handleRecharge(card.id, card.price, 'Touch')}
                disabled={loading}
              >
                {loading && selectedCardId === card.id ? '...' : 'Recharge'}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}