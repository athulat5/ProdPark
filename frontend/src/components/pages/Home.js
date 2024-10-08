import React from 'react';
import { Link } from 'react-router-dom';
import bg3 from '../images/prodpark.jpg'; 
import './style.css'; 

function Home() {
  const homeStyle = {
    backgroundImage: `url(${bg3})`,
    backgroundSize: 'cover',         // Maintain cover for full area
    backgroundPosition: 'center',     // Center the image
    backgroundRepeat: 'no-repeat',    // Prevent repeating
    height: '100vh',                  // Full viewport height
    width: '100vw',                   // Full viewport width
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',          // Stack items vertically
    padding: '20px',                  // Add padding
    textAlign: 'center',              // Center text
  };

  return (
    <div style={homeStyle}>
      <Link to="/home2" className="zooming-link">Explore</Link>
    </div>
  );
}

export default Home;
