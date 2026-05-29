import React, { useState } from 'react';
import './it-support.css'; 

// --- FIXED IMAGE IMPORTS FROM YOUR PICS FOLDER ---
import markPhoto from './pics/markos.jpeg';
import miralynnPhoto from './pics/miralynnyyyy.jpeg';

const ITSupport = () => {
  const [activeModal, setActiveModal] = useState(null);

  const teamMembers = [
    {
      name: "Mark",
      role: "IT Support Specialist",
      phone: "76385221",
      photo: markPhoto
    },
    {
      name: "Miralynn",
      role: "IT Support Specialist",
      phone: "81178277",
      photo: miralynnPhoto
    }
  ];

  const contactChannels = [
    {
      id: "hotline",
      title: "Help Desk Hotlines",
      detail: "Immediate technical routing and hardware troubleshooting voice queues.",
      actionLabel: "Call Ext. 4400",
      icon: "📞",
      meta: "Average Hold Time: 45s",
      link: "tel:4400"
    },
    {
      id: "onsite",
      title: "On-Site Central Desk",
      detail: "Physical assets routing, component replacements, & active manual configurations.",
      actionLabel: "Locate Engineering Desk",
      icon: "🏢",
      meta: "Room 402 - Sector B",
      link: "#"
    },
    {
      id: "ticket",
      title: "Diagnostics Ticket",
      detail: "Submit automated server stack traces for custom software and network rules.",
      actionLabel: "Open Priority Ticket",
      icon: "🎫",
      meta: "Response within 15m",
      link: "#"
    },
    {
      id: "vlan",
      title: "VLAN & Switch Panel",
      detail: "Review specific administrative distances, port tagging logs, and route mapping requests.",
      actionLabel: "Request Route Diagnostic",
      icon: "🌐",
      meta: "Admin Rights Needed",
      link: "#"
    }
  ];

  return (
    <div className="it-support-container">
      
      {/* Header Section */}
      <div className="it-header-section">
        <span className="operations-badge">Operations Center</span>
        <h1 className="it-main-title">💻 IT Technical Support Center</h1>
        <p className="it-subtitle">
          Enterprise diagnostics, network topology validation, and core software help desk loops.
        </p>
      </div>

      {/* Operational Status Panel */}
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
          onClick={() => setActiveModal({ title: "Live System Logs", text: "Initializing secure system telemetry handshake... Port active on Core-VLAN-10." })}
        >
          Check System Pulse
        </button>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2 className="team-section-title">Meet Our Technicians</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar-wrapper">
                <img src={member.photo} alt={member.name} className="team-avatar" />
              </div>
              <h3 className="team-member-name">{member.name}</h3>
              <p className="team-member-role">{member.role}</p>
              <a href={`tel:${member.phone}`} className="team-phone-btn">
                📞 Call {member.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Channels Cards */}
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

            <a 
              href={channel.link}
              className="card-action-link-btn"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              {channel.actionLabel}
            </a>
          </div>
        ))}
      </div>

      {/* Footer Meta Details */}
      <div className="it-footer-section">
        <p className="security-string">
          System Security: SECURE-VLAN-10 // Admin Distance Matrix Validated
        </p>
      </div>

      {/* Portal Dialog Modal Window */}
      {activeModal && (
        <div className="modal-overlay">
          <div className="modal-content-card">
            <div className="modal-graphic">⚡</div>
            <h2 className="modal-title">{activeModal.title}</h2>
            <p className="modal-text">{activeModal.text}</p>
            <div className="modal-status-badge">
              ✓ STACK STATUS: PIPELINE TERMINAL RESPONDING
            </div>
            <button className="modal-close-btn" onClick={() => setActiveModal(null)}>
              Dismiss Terminal Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ITSupport;