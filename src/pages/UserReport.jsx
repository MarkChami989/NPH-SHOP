import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './report.css';

const REPORT_URL = 'http://localhost:5000/api/report';

export default function UserReport() {
  const [report, setReport] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userActivities, setUserActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchReport = () => {
    fetch(REPORT_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setReport(data.report);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  const fetchUserDetail = (username) => {
    setDetailLoading(true);
    setSelectedUser(username);
    setUserActivities([]);
    fetch(`${REPORT_URL}/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUserActivities(data.activities);
        setDetailLoading(false);
      })
      .catch(() => setDetailLoading(false));
  };

  useEffect(() => {
    fetchReport();
    const interval = setInterval(fetchReport, 30000);
    return () => clearInterval(interval);
  }, []);

  const totalActivities = report.reduce((sum, u) => sum + Number(u.total_actions || 0), 0);
  const mostActiveUser = report.length > 0 ? report[0] : null;

  const getTypeClass = (type) => (type || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  return (
    <div className="report-container">

      <div className="report-page-header">
        <Link to="/" className="back-link">← Dashboard</Link>
        <h1>User Activity Report</h1>
        <div className="report-header-actions">
          <button
            onClick={() => { setLoading(true); fetchReport(); }}
            className="refresh-btn"
          >
            Refresh
          </button>
          <span className="live-badge-report">
            {error ? 'Offline' : 'Live 30s'}
          </span>
        </div>
      </div>

      {error && (
        <div className="report-offline-banner">
          Server offline — check that <code>server.js</code> is running on port 5000.
        </div>
      )}

      <div className="report-stats-strip">
        <div className="report-stat-card">
          <span className="report-stat-value">{report.length}</span>
          <span className="report-stat-label">Tracked Users</span>
        </div>
        <div className="report-stat-card">
          <span className="report-stat-value">{totalActivities}</span>
          <span className="report-stat-label">Total Activities</span>
        </div>
        <div className="report-stat-card">
          <span className="report-stat-value">{mostActiveUser?.username || '—'}</span>
          <span className="report-stat-label">Most Active User</span>
        </div>
        <div className="report-stat-card">
          <span className="report-stat-value">{mostActiveUser?.total_actions || 0}</span>
          <span className="report-stat-label">Top User Actions</span>
        </div>
      </div>

      <div className="report-section">
        <div className="report-section-header">
          <h2>All Users Overview</h2>
          <span className="report-section-count">{report.length} user{report.length !== 1 ? 's' : ''} tracked</span>
        </div>

        {loading ? (
          <div className="report-loading">Loading user data...</div>
        ) : report.length === 0 ? (
          <div className="report-empty">No user activity recorded yet. Activities will appear after users log in or make transactions.</div>
        ) : (
          <div className="report-table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Total Actions</th>
                  <th>Recharges</th>
                  <th>Logins</th>
                  <th>Other</th>
                  <th>Last Seen</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {report.map((user) => {
                  const other = Number(user.total_actions) - Number(user.recharge_count) - Number(user.login_count);
                  return (
                    <tr
                      key={user.username}
                      className={selectedUser === user.username ? 'selected-row' : ''}
                      onClick={() => fetchUserDetail(user.username)}
                    >
                      <td className="username-cell">
                        <span className="user-avatar">{(user.username || 'S')[0].toUpperCase()}</span>
                        {user.username}
                      </td>
                      <td><strong>{user.total_actions}</strong></td>
                      <td><span className="count-badge recharge-badge">{user.recharge_count}</span></td>
                      <td><span className="count-badge login-badge">{user.login_count}</span></td>
                      <td><span className="count-badge other-badge">{other > 0 ? other : 0}</span></td>
                      <td className="time-cell">
                        {user.last_activity ? new Date(user.last_activity).toLocaleString() : 'N/A'}
                      </td>
                      <td>
                        <button
                          className="detail-btn"
                          onClick={(e) => { e.stopPropagation(); fetchUserDetail(user.username); }}
                        >
                          View Log
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedUser && (
        <div className="report-section report-detail-section">
          <div className="report-section-header">
            <h2>
              Activity Log —{' '}
              <span className="username-highlight">{selectedUser}</span>
            </h2>
            <button
              className="close-detail-btn"
              onClick={() => { setSelectedUser(null); setUserActivities([]); }}
            >
              ✕ Close
            </button>
          </div>

          {detailLoading ? (
            <div className="report-loading">Loading activities for {selectedUser}...</div>
          ) : userActivities.length === 0 ? (
            <div className="report-empty">No activities found for this user.</div>
          ) : (
            <div className="report-table-wrapper">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Type</th>
                    <th>Details</th>
                    <th>Target</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userActivities.map((act) => (
                    <tr key={act.id}>
                      <td className="time-cell">{act.timestamp}</td>
                      <td>
                        <span className={`type-tag ${getTypeClass(act.type)}`}>
                          {act.type}
                        </span>
                      </td>
                      <td className="details-col">{act.details}</td>
                      <td><code>{act.target}</code></td>
                      <td>
                        <span className={`status-dot ${act.status}`}></span>
                        {act.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
