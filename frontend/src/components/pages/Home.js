import React from 'react';
import { Link } from 'react-router-dom';
import bg3 from '../images/bg3.jpg'; 
import './style.css'; 

function Home() {
  const homeStyle = {
    backgroundImage: `url(${bg3})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
  };

  return (
    <div style={homeStyle}>
      <Link to="/home2" className="zooming-link">Explore</Link>
    </div>
  );
}

export default Home;
