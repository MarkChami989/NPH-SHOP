import React from 'react';
import './accessories.css';

const Accessories = () => {
 const gadgets = [
    { 
      id: 1, 
      name: "Belkin 3-in-1 Charging Stand", 
      price: "$119.99", 
      img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80" // Fixed live charging desk accessory link
    },
    { 
      id: 2, 
      name: "Mechanical Keyboard", 
      price: "$89.99", 
      img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80" 
    },
    { 
      id: 3, 
      name: "Wireless Mouse", 
      price: "$79.50", 
      img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80" 
    },
    { 
      id: 4, 
      name: "ANC Headphones", 
      price: "$199.00", 
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" 
    },
    { 
      id: 5, 
      name: "4K Web Camera", 
      price: "$129.99", 
      img: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=400&q=80" 
    },
    { 
      id: 6, 
      name: "Phone Car Mount", 
      price: "$24.99", 
      img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&q=80" 
    },
    { 
      id: 7, 
      name: "1TB Portable SSD", 
      price: "$109.00", 
      img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&q=80" // Fixed live external storage drive link
    },
    { 
      id: 8, 
      name: "Streamer Microphone", 
      price: "$95.00", 
      img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80" 
    },
    { 
      id: 9, 
      name: "Smart Watch Series 9", 
      price: "$299.99", 
      img: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&q=80" 
    },
    { 
      id: 10, 
      name: "USB-C Hub", 
      price: "$45.00", 
      img: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&q=80" 
    }
  ];
  return (
    <div className="accessories-page">
      <div className="gadget-bubble-container">
        {gadgets.map((gadget) => (
          <div key={gadget.id} className="gadget-bubble-card">
            <div className="bubble-image-wrapper">
              <img src={gadget.img} alt={gadget.name} />
            </div>
            <h4 className="bubble-title">{gadget.name}</h4>
            <span className="bubble-price">{gadget.price}</span>
            <button className="bubble-buy-btn" onClick={() => alert(`Proceeding to checkout for ${gadget.name}!`)}>
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accessories;