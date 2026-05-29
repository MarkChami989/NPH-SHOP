import React, { useState } from 'react';

const ITSupport = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const contactChannels = [
    {
      id: "hotline",
      title: "Help Desk Hotlines",
      detail: "Immediate technical routing and hardware troubleshooting voice queues.",
      actionLabel: "Call Ext. 4400",
      icon: "📞",
      meta: "Average Hold Time: 45s"
    },
    {
      id: "onsite",
      title: "On-Site Central Desk",
      detail: "Physical assets routing, component replacements, & active manual configurations.",
      actionLabel: "Locate Engineering Desk",
      icon: "🏢",
      meta: "Room 402 - Sector B"
    },
    {
      id: "ticket",
      title: "Diagnostics Ticket",
      detail: "Submit automated server stack traces for custom software and network rules.",
      actionLabel: "Open Priority Ticket",
      icon: "🎫",
      meta: "Response within 15m"
    },
    {
      id: "vlan",
      title: "VLAN & Switch Panel",
      detail: "Review specific administrative distances, port tagging logs, and route mapping requests.",
      actionLabel: "Request Route Diagnostic",
      icon: "🌐",
      meta: "Admin Rights Needed"
    }
  ];

  return (
    <div style={{ padding: '50px 20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>
          Operations Center
        </span>
        <h1 style={{ color: '#0f172a', fontSize: '2.8rem', fontWeight: '800', margin: '15px 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          💻 IT Technical Support Center
        </h1>
        <p style={{ color: '#475569', fontSize: '1.15rem' }}>
          Enterprise diagnostics, network topology validation, and core software help desk loops.
        </p>
      </div>

      <div style={{ 
        backgroundColor: '#ffffff', 
        border: '1px solid #e2e8f0', 
        borderRadius: '16px', 
        padding: '24px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '45px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '12px', height: '12px', backgroundColor: '#22c55e', borderRadius: '50%' }}></span>
          </div>
          <div>
            <h4 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem', fontWeight: '700' }}>Active System Operations Status: Connected</h4>
            <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>All technicians are currently logged into terminals. Active queue length: 0.</p>
          </div>
        </div>
        <button 
          onClick={() => setActiveModal({ title: "Live System Logs", text: "Initializing secure system telemetry handshake... Port active on Core-VLAN-10." })}
          style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#0f172a', padding: '10px 20px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}
        >
          Check System Pulse
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {contactChannels.map((channel) => {
          const isHovered = hoveredCard === channel.id;
          return (
            <div 
              key={channel.id}
              onMouseEnter={() => setHoveredCard(channel.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0px) scale(1)',
                boxShadow: isHovered 
                  ? '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)' 
                  : '0 4px 6px -1px rgba(0,0,0,0.02)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '2.2rem', backgroundColor: '#f1f5f9', width: '55px', height: '55px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {channel.icon}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', backgroundColor: '#f8fafc', padding: '4px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', fontWeight: '500' }}>
                    {channel.meta}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.3rem', color: '#0f172a', margin: '0 0 10px 0', fontWeight: '700' }}>
                  {channel.title}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 30px 0' }}>
                  {channel.detail}
                </p>
              </div>

              <button 
                onClick={() => setActiveModal({ title: channel.title, text: `Triggering action sequence for system sub-routine routing: "${channel.actionLabel}"... Connection successfully linked.` })}
                style={{
                  width: '100%',
                  backgroundColor: '#111827',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  boxShadow: isHovered ? '0 4px 12px rgba(17,24,39,0.2)' : 'none'
                }}
              >
                {channel.actionLabel}
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: '60px', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
          System Security: SECURE-VLAN-10 // Admin Distance Matrix Validated
        </p>
      </div>

      {activeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '24px', maxWidth: '480px', width: '90%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⚡</div>
            <h2 style={{ color: '#0f172a', margin: '0 0 12px 0', fontWeight: '800' }}>{activeModal.title}</h2>
            <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.6', margin: '0 0 20px 0' }}>
              {activeModal.text}
            </p>
            <div style={{ margin: '20px 0', padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '10px', fontSize: '0.85rem', color: '#166534', fontWeight: '600' }}>
              ✓ STACK STATUS: PIPELINE TERMINAL RESPONDING
            </div>
            <button 
              onClick={() => setActiveModal(null)}
              style={{ backgroundColor: '#111827', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
            >
              Dismiss Terminal Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ITSupport;