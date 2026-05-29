import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './photo/logo-01.png';
import './Home.css';

const services = [
  { title: 'Alfa & MTC', description: 'Recharge & SIM services', icon: '📱', path: '/alfa-mtc' },
  { title: 'Printing', description: 'Print, scan & copy', icon: '🖨️', path: '/printing' },
  { title: 'IT Support', description: 'Repair & tech help', icon: '💻', path: '/it-support' },
  { title: 'Accessories', description: 'Cables, cases & more', icon: '🎧', path: '/accessories' },
];

const infoSlides = [
  { icon: '📱', title: 'Alfa & MTC Services', text: 'Instant telecom balance distributions and secured server-side terminal connections.', path: '/alfa-mtc' },
  { icon: '🖨️', title: 'High-Volume Printing Pipeline', text: 'Commercial high-speed laser jets and heavy-duty digital scanners.', path: '/printing' },
  { icon: '💻', title: 'Complete Technical IT Support', text: 'Motherboard-level hardware diagnostics and software restoration pipelines.', path: '/it-support' },
  { icon: '🎧', title: 'Premium Hardware Accessories', text: 'Explore a fully tracked inventory of premium hardware enhancements.', path: '/accessories' },
  { icon: '🛒', title: 'Our Vision & Management System', text: "A fully dynamic Shop Management System managing live telemetry and inventory.", path: '/' }
];

const bannerImages = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80', 
  'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=1200&q=80', 
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'  
];

// Curated live tech assets (Phones, Laptops, PCs) matching your layout aesthetics
const showcaseImages = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80', // Smartphone
  'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&q=80', // Laptop workstation
  'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=300&q=80', // Desktop PC
  'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&q=80', // Premium laptop
  'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=300&q=80', // PC Setup/Monitor
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80', // Apple Macbook
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userProfile');
    navigate('/login');
  };

  const [activeUsers, setActiveUsers] = useState(16);
  const [systemPower, setSystemPower] = useState(98.8);
  const [serverLoad, setServerLoad] = useState(34);

  useEffect(() => {
    const infoTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % infoSlides.length);
    }, 5000);
    return () => clearInterval(infoTimer);
  }, []);

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(bannerTimer);
  }, []);

  useEffect(() => {
    const statsInterval = setInterval(() => {
      setActiveUsers(() => Math.floor(Math.random() * (19 - 13 + 1)) + 13);
      setSystemPower(() => parseFloat((98 + Math.random()).toFixed(1)));
      setServerLoad(() => Math.floor(Math.random() * (38 - 25 + 1)) + 25);
    }, 4000);
    return () => clearInterval(statsInterval);
  }, []);

  const slide = infoSlides[currentSlide];

  return (
    <div className="container">
      
      <header className="header animate-fade-down">
        <h1 className="logo">
          <img src={logo} alt="NPH Logo" className="logo-image" /> 
        </h1>

        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search products, services, codes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="header-actions">
          <Link to="/setting" className="action-icon-link" title="Settings">⚙️</Link>
          <Link to="/profile" className="action-icon-link" title="Profile">👤 {username}</Link>
          <Link to="/menu" className="action-icon-link" title="Activity Log">📋</Link>
          <button onClick={handleLogout} className="login-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
        </div>
      </header>

      <section className="hero-banner-container animate-fade-in">
        <div 
          className="hero-banner-slide" 
          style={{ backgroundImage: `url(${bannerImages[currentBanner]})` }}
          key={currentBanner}
        >
          <div className="banner-overlay">
            <h2 className="banner-text">CHOOSE THE SERVICE THAT SPEAKS YOUR STYLE!</h2>
            <p className="banner-subtext">Netronics Power Hub Premium</p>
          </div>
        </div>
        <div className="banner-dots">
          {bannerImages.map((_, idx) => (
            <span key={idx} className={`banner-dot ${idx === currentBanner ? 'active' : ''}`} />
          ))}
        </div>
      </section>

      <section className="stats-bar animate-fade-down">
        <div className="stat-item">
          <span className="stat-indicator online"></span>
          <div className="stat-data">
            <span className="stat-value">{activeUsers}</span>
            <span className="stat-label">Active Terminals</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-indicator power"></span>
          <div className="stat-data">
            <span className="stat-value">{systemPower}%</span>
            <span className="stat-label">System Performance</span>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-indicator traffic"></span>
          <div className="stat-data">
            <span className="stat-value">{serverLoad} req/s</span>
            <span className="stat-label">Live Sync Rate</span>
          </div>
        </div>
      </section>

      <main className="grid">
        {services.map((s, index) => (
          <Link 
            to={s.path} 
            key={s.title} 
            className="card animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }} 
          >
            <div className="card-icon">{s.icon}</div>
            <h2 className="card-title">{s.title}</h2>
            <p className="card-description">{s.description}</p>
          </Link>
        ))}
      </main>

      {/* NEW: Infinite moving hardware showcase bar inserted cleanly right here */}
      <section className="moving-hardware-showcase animate-fade-in">
        <div className="showcase-marquee-track">
          {/* First image array pass */}
          {showcaseImages.map((url, i) => (
            <div className="showcase-bubble-item" key={`showcase-1-${i}`}>
              <img src={url} alt="Hardware Equipment Asset" />
            </div>
          ))}
          {/* Duplicated image array pass to guarantee a perfect seamless infinitely loop */}
          {showcaseImages.map((url, i) => (
            <div className="showcase-bubble-item" key={`showcase-2-${i}`}>
              <img src={url} alt="Hardware Equipment Asset" />
            </div>
          ))}
        </div>
      </section>

      <section className="about-section-wrapper">
        <div className="about-section active-slide-box" key={currentSlide}>
          <div className="info-header-row">
            <div className="logo-badge-container">
              <span className="info-slide-logo">{slide.icon}</span>
              <h2 className="about-title">Overview</h2>
            </div>
            <span className="live-pulse-dot"></span>
          </div>
          
          <div className="about-content">
            <p className="about-p">
              <strong>{slide.title}:</strong> {slide.text}
            </p>
          </div>
          
          <div className="action-row">
            <Link to={slide.path} className="direct-entry-btn">
              Open Section 
            </Link>
          </div>
        </div>
        
        <div className="dots-navigation">
          {infoSlides.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}