import { useState } from 'react';
import { Link } from 'react-router-dom';
import './printing.css';

// ── Price table: service → paper size → price per page (USD) ──
const PRICES = {
  'B&W Print': { A1: 1.00, A2: 0.50, A3: 0.25, A4: 0.10, A5: 0.07, A6: 0.05 },
  'Color Print':{ A1: 3.00, A2: 1.50, A3: 0.75, A4: 0.30, A5: 0.20, A6: 0.15 },
  'Scan':       { A1: 2.00, A2: 1.00, A3: 0.50, A4: 0.15, A5: 0.10, A6: 0.08 },
};

const SIZES = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'];

export default function Printing() {
  const [jobType,   setJobType]   = useState('B&W Print');
  const [paperSize, setPaperSize] = useState('A4');
  const [pages,     setPages]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState('');
  const [error,     setError]     = useState('');

  const unitPrice = PRICES[jobType][paperSize];
  const total     = pages && parseInt(pages) > 0
    ? (unitPrice * parseInt(pages)).toFixed(2)
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    const username = localStorage.getItem('username');
    if (!username) { setError('⚠️ Not logged in.'); return; }
    if (!pages || parseInt(pages) < 1) { setError('⚠️ Enter a valid number of pages.'); return; }

    setLoading(true);
    try {
      const res  = await fetch('http://localhost:5000/api/printing', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username, jobType, paperSize, pages, cost: total }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(`✅ ${jobType} — ${paperSize} — ${pages} pages — $${total}  (${data.jobId})`);
        setPages('');
      } else {
        setError(`❌ ${data.error}`);
      }
    } catch {
      setError('❌ Cannot reach server. Make sure server.js is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prt-page">

      {/* Top bar */}
      <div className="prt-topbar">
        <Link to="/" className="prt-back">← Dashboard</Link>
        <span className="prt-operator">
          👤 {localStorage.getItem('username') || 'Not logged in'}
        </span>
      </div>

      {/* Header */}
      <div className="prt-header">
        <h1>🖨️ Printing & Scanning</h1>
        <p>Select service and paper size, enter pages — price calculated automatically.</p>
      </div>

      <div className="prt-card">

        {success && <div className="prt-success">{success}</div>}
        {error   && <div className="prt-error">{error}</div>}

        <form onSubmit={handleSubmit}>

          {/* Service Type */}
          <div className="prt-field">
            <label className="prt-label">Service Type</label>
            <div className="prt-type-group">
              {Object.keys(PRICES).map(type => (
                <button
                  key={type}
                  type="button"
                  className={`prt-type-btn ${jobType === type ? 'active' : ''}`}
                  onClick={() => setJobType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Paper Size */}
          <div className="prt-field">
            <label className="prt-label">Paper Size</label>
            <div className="prt-size-group">
              {SIZES.map(size => (
                <button
                  key={size}
                  type="button"
                  className={`prt-size-btn ${paperSize === size ? 'active' : ''}`}
                  onClick={() => setPaperSize(size)}
                >
                  <span className="prt-size-name">{size}</span>
                  <span className="prt-size-price">${PRICES[jobType][size].toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Number of Pages */}
          <div className="prt-field">
            <label className="prt-label">Number of Pages</label>
            <input
              className="prt-input"
              type="number"
              min="1"
              value={pages}
              onChange={e => setPages(e.target.value)}
              placeholder="e.g. 10"
              required
            />
          </div>

          {/* Price Summary */}
          <div className="prt-summary">
            <div className="prt-summary-row">
              <span>Unit Price</span>
              <span>${unitPrice.toFixed(2)} / page</span>
            </div>
            <div className="prt-summary-row">
              <span>Pages</span>
              <span>{pages || '—'}</span>
            </div>
            <div className="prt-summary-divider" />
            <div className="prt-summary-row prt-summary-total">
              <span>Total</span>
              <span>{total ? `$${total}` : '—'}</span>
            </div>
          </div>

          <button className="prt-submit" disabled={loading}>
            {loading ? 'Saving…' : `Submit Order${total ? `  —  $${total}` : ''}`}
          </button>

        </form>
      </div>
    </div>
  );
}
