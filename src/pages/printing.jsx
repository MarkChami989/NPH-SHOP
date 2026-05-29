import React, { useState } from 'react';
import './Printing.css';

const Printing = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedDevice, setSelectedDevice] = useState(null);

  const categories = ['All', 'Laser Jets', 'Scanners', '3D & Plotters'];

  const printers = [
    {
      id: 1,
      name: "HP LaserJet Enterprise M507dn",
      category: "Laser Jets",
      type: "Monochrome Laser Printer",
      specs: ["50 ppm Heavy Output Speed", "Auto Duplex Printing", "Multi-layered Device Security"],
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&auto=format&fit=crop&q=60",
      status: "In Stock"
    },
    {
      id: 2,
      name: "Epson EcoTank Pro ET-5800",
      category: "Laser Jets",
      type: "All-in-One Supertank",
      specs: ["Ultra-low cost per page ink", "Dual 250-sheet paper trays", "High-speed color processing"],
      image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=500&auto=format&fit=crop&q=60",
      status: "In Stock"
    },
    {
      id: 3,
      name: "Canon imageCLASS MF743Cdw",
      category: "Laser Jets",
      type: "Color Laser All-in-One",
      specs: ["Application Library customization", "28 ppm Color/Black execution", "Wireless Direct Connection"],
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=500&auto=format&fit=crop&q=60",
      status: "Low Stock"
    },
    {
      id: 4,
      name: "Fujitsu ScanSnap iX1600",
      category: "Scanners",
      type: "High-Volume Document Scanner",
      specs: ["40 ppm double-sided scanning", "4.3-inch touch control panel", "Direct cloud integration profiles"],
      image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=500&auto=format&fit=crop&q=60",
      status: "In Stock"
    },
    {
      id: 5,
      name: "Zebra ZT411 Industrial",
      category: "3D & Plotters",
      type: "High-Res Thermal Label Engine",
      specs: ["Metal construction durability", "203 dpi sharp printing resolution", "Dual USB and Ethernet interfaces"],
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&auto=format&fit=crop&q=60",
      status: "In Stock"
    },
    {
      id: 6,
      name: "DesignJet T630 Plotter",
      category: "3D & Plotters",
      type: "Large Format Wireless Plotter",
      specs: ["A1 size engineering blue prints", "Built-in automatic sheet feeder", "Vibrant dye-based printheads"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60",
      status: "On Order"
    }
  ];

  const filteredPrinters = activeTab === 'All' 
    ? printers 
    : printers.filter(p => p.category === activeTab);

  return (
    <div className="printing-container">
      {/* Header Section */}
      <div className="printing-header">
        <span className="badge">Hardware Architecture</span>
        <h1 className="title">🖨️ Printing & Hardware Pipeline</h1>
        <p className="subtitle">
          Deploy, configure, and monitor high-volume commercial laser engines and digital scanners.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="tabs-container">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`tab-button ${activeTab === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Network */}
      <div className="cards-grid">
        {filteredPrinters.map((printer) => {
          const isHovered = hoveredCard === printer.id;
          return (
            <div 
              key={printer.id} 
              onMouseEnter={() => setHoveredCard(printer.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`device-card ${isHovered ? 'hovered' : ''}`}
            >
              {/* Image Wrappers */}
              <div className="image-wrapper">
                <img 
                  src={printer.image} 
                  alt={printer.name}
                  className={`card-image ${isHovered ? 'zoomed' : ''}`}
                />
                <span className={`status-badge ${printer.status.replace(/\s+/g, '-').toLowerCase()}`}>
                  {printer.status}
                </span>
              </div>

              {/* Content Details */}
              <div className="card-content">
                <div>
                  <span className="device-type">{printer.type}</span>
                  <h3 className="device-name">{printer.name}</h3>
                  
                  <ul className="specs-list">
                    {printer.specs.map((spec, index) => (
                      <li key={index} className="spec-item">
                        <span className="checkmark">✓</span> {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => setSelectedDevice(printer)}
                  className={`configure-btn ${isHovered ? 'shadowed' : ''}`}
                >
                  Configure Device
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Diagnostic Modal */}
      {selectedDevice && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">⚙️</div>
            <h2 className="modal-title">Initializing Pipeline Connection</h2>
            <p className="modal-description">
              Connecting local client port to server configuration profile for <strong>{selectedDevice.name}</strong>...
            </p>
            <div className="modal-terminal">
              STATUS: API_READY // PORT_LINKED_VLAN10
            </div>
            <button 
              onClick={() => setSelectedDevice(null)}
              className="close-btn"
            >
              Close Diagnostics
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Printing;