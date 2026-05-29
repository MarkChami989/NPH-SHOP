import { useState } from 'react';
import { Link } from 'react-router-dom';
import './it-support.css';
import markPhoto from './pics/markos.jpeg';
import miralynnPhoto from './pics/miralynnyyyy.jpeg';

const API = 'http://localhost:5000/api/activities';

const teamMembers = [
  { name: "Mark",     role: "IT Support Specialist", phone: "76385221", photo: markPhoto },
  { name: "Miralynn", role: "IT Support Specialist", phone: "81178277", photo: miralynnPhoto },
];

const contactChannels = [
  { id: "hotline", title: "Help Desk Hotlines",   actionLabel: "Call Ext. 4400",         icon: "📞", meta: "Average Hold Time: 45s",  detail: "Immediate technical routing and hardware troubleshooting voice queues.",                            link: "tel:4400" },
  { id: "onsite",  title: "On-Site Central Desk", actionLabel: "Locate Engineering Desk", icon: "🏢", meta: "Room 402 - Sector B",       detail: "Physical assets routing, component replacements, & active manual configurations.",                   link: "#" },
  { id: "ticket",  title: "Diagnostics Ticket",   actionLabel: "Open Priority Ticket",    icon: "🎫", meta: "Response within 15m",        detail: "Submit automated server stack traces for custom software and network rules.",                          link: "#" },
  { id: "vlan",    title: "VLAN & Switch Panel",  actionLabel: "Request Route Diagnostic",icon: "🌐", meta: "Admin Rights Needed",         detail: "Review specific administrative distances, port tagging logs, and route mapping requests.",               link: "#" },
];

export default function ITSupport() {
  const [activeModal, setActiveModal] = useState(null);
  const [logged,      setLogged]      = useState({});
  const [error,       setError]       = useState('');

  const logActivity = async (channel) => {
    const username = localStorage.getItem('username') || 'system';
    try {
      const res  = await fetch(API, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          username,
          type:    'IT Support',
          details: channel.actionLabel,
          target:  channel.title,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setLogged(prev => ({ ...prev, [channel.id]: true }));
        setTimeout(() => setLogged(prev => ({ ...prev, [channel.id]: false })), 3000);
      }
    } catch {
      setError('Cannot reach server.');
    }
  };

  const handleChannelClick = (channel) => {
    logActivity(channel);
    if (channel.id === 'hotline') return;
    setActiveModal({ title: channel.title, text: channel.detail });
  };

  return (
    <div className="it-support-container">

      <div className="it-topbar">
        <Link to="/" className="it-back">← Dashboard</Link>
        <span className="it-operator">👤 {localStorage.getItem('username') || '—'}</span>
      </div>

      {error && <div className="it-error">{error}</div>}

      {/* Header */}
      <div className="it-header-section">
        <span className="operations-badge">Operations Center</span>
        <h1 className="it-main-title">💻 IT Technical Support Center</h1>
        <p className="it-subtitle">
          Enterprise diagnostics, network topology validation, and core software help desk loops.
        </p>
      </div>

      {/* Status Panel */}
      <div className="status-panel">
        <div className="status-info-wrapper">
          <div className="status-indicator-wrapper">
            <span className="status-dot"></span>
          </div>
          <div>
            <h4 className="status-title">Active System Operations Status: Connected</h4>
            <p className="status-description">All technicians are currently logged into terminals. Active queue length: 0.</p>
          </div>
        </div>
        <button
          className="pulse-check-btn"
          onClick={() => {
            logActivity({ id: 'pulse', actionLabel: 'Check System Pulse', title: 'System Monitor' });
            setActiveModal({ title: "Live System Logs", text: "Initializing secure system telemetry handshake... Port active on Core-VLAN-10." });
          }}
        >
          Check System Pulse
        </button>
      </div>

      {/* Team */}
      <div className="team-section">
        <h2 className="team-section-title">Meet Our Technicians</h2>
        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <div key={i} className="team-card">
              <div className="team-avatar-wrapper">
                <img src={member.photo} alt={member.name} className="team-avatar" />
              </div>
              <h3 className="team-member-name">{member.name}</h3>
              <p className="team-member-role">{member.role}</p>
              <a
                href={`tel:${member.phone}`}
                className="team-phone-btn"
                onClick={() => logActivity({ id: `call-${member.name}`, actionLabel: `Called ${member.name}`, title: 'IT Support Call' })}
              >
                📞 Call {member.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Channel Cards */}
      <div className="channels-grid">
        {contactChannels.map((channel) => (
          <div key={channel.id} className="channel-card">
            <div>
              <div className="card-header-row">
                <div className="card-icon-wrapper">{channel.icon}</div>
                <span className="card-meta-tag">{channel.meta}</span>
              </div>
              <h3 className="card-title">{channel.title}</h3>
              <p className="card-detail">{channel.detail}</p>
            </div>
            <button
              className={`card-action-link-btn ${logged[channel.id] ? 'logged' : ''}`}
              onClick={() => handleChannelClick(channel)}
            >
              {logged[channel.id] ? '✅ Logged' : channel.actionLabel}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="it-footer-section">
        <p className="security-string">
          System Security: SECURE-VLAN-10 // Admin Distance Matrix Validated
        </p>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content-card" onClick={e => e.stopPropagation()}>
            <div className="modal-graphic">⚡</div>
            <h2 className="modal-title">{activeModal.title}</h2>
            <p className="modal-text">{activeModal.text}</p>
            <div className="modal-status-badge">✓ STACK STATUS: PIPELINE TERMINAL RESPONDING</div>
            <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
              Dismiss Terminal Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
