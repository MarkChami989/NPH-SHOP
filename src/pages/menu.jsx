import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

const Menu = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorCondition, setErrorCondition] = useState(false);

  // Eza mghayyar el port lal Express server taba3ak, ghayyro hon (e.g., 4000 aw 5000)
  const API_URL = 'http://localhost:5000/api/activities';

  const fetchActivities = () => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Server response warning");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setActivities(data);
        } else if (data && Array.isArray(data.activities)) {
          setActivities(data.activities);
        } else {
          setActivities([]);
        }
        setErrorCondition(false);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching logs from server:", err);
        setErrorCondition(true);
        setLoading(false);
        setActivities([
          { id: 101, timestamp: 'Now (Offline Mode)', type: 'Alfa & MTC', details: 'Touch $11.23', target: '70123456', status: 'success' },
          { id: 102, timestamp: 'Now (Offline Mode)', type: 'Accessories', details: 'Mouse Wireless', target: 'Shop Sale', status: 'success' }
        ]);
      });
  };

  useEffect(() => {
    fetchActivities();
    const interval = setInterval(fetchActivities, 30000);
    return () => clearInterval(interval);
  }, []);

  const logActivityToServer = async (type, details, target = 'N/A') => {
    const username = localStorage.getItem('username') || 'system';
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, details, target, username }),
      });

      const data = await response.json();
      
      if (data.success) {
        setActivities((prev) => [data.log, ...prev]);
      } else {
        // Local fallback eza l backend error
        createLocalLog(type, details, target);
      }
    } catch (error) {
      console.error("Failed to log action to server, making local log:", error);
      createLocalLog(type, details, target);
    }
  };

  const createLocalLog = (type, details, target) => {
    const localLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      type,
      details,
      target,
      status: 'success'
    };
    setActivities((prev) => [localLog, ...prev]);
  };

  const handlePurchase = (itemType, itemName, targetRef) => {
    logActivityToServer(itemType, itemName, targetRef);
  };

  return (
    <div className="menu-container">
      {errorCondition && (
        <div style={{ background: '#fff3cd', color: '#856404', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '0.85rem' }}>
          ⚠️ Connected via Offline Fallback mode. Check if <code>server.js</code> is running.
        </div>
      )}

      <div className="test-actions">
        <h3>Quick Test Actions</h3>
        <button onClick={() => handlePurchase('Alfa & MTC', 'MTC $22 Days', '71123456')}>
          Simulate Touch Recharge
        </button>
        <button onClick={() => handlePurchase('Accessories', 'Gaming Headset', 'Counter Cash')}>
          Simulate Accessory Sale
        </button>
      </div>

      <div className="activity-section">
        <div className="activity-header">
          <h2>Recent Terminal Activities</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => { setLoading(true); fetchActivities(); }}
              style={{ background: '#f1f3f5', border: '1px solid #dee2e6', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600', color: '#495057' }}
            >
              Refresh
            </button>
            <span className="live-badge" style={{ backgroundColor: errorCondition ? '#ffe3e3' : '#e6f7ff', color: errorCondition ? '#e12323' : '#1890ff' }}>
              {errorCondition ? 'Local Terminal' : 'Live - Auto Refresh 30s'}
            </span>
          </div>
        </div>

        <div className="activity-table-wrapper">
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666', fontWeight: 'bold' }}>Loading logs...</div>
          ) : (
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Service Type</th>
                  <th>Details / Item</th>
                  <th>Target / Reference</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: '#999', padding: '20px' }}>No recent actions tracked.</td>
                  </tr>
                ) : (
                  activities.map((act) => (
                    <tr key={act.id}>
                      <td className="time-col">{act.timestamp}</td>
                      <td>
                        <span className={`type-tag ${(act.type || '').toLowerCase().replace(/[^a-z0-9]/g, '')}`}>
                          {act.type}
                        </span>
                      </td>
                      <td className="details-col">{act.details}</td>
                      <td className="target-col"><code>{act.target}</code></td>
                      <td>
                        <span className={`status-dot ${act.status}`}></span>
                        {act.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;