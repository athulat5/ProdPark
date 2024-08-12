// src/pages/Home.js
import React from 'react';
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
       <a href="Home2.js" className="zooming-link">Explore</a>
    </div>
  );
}

export default Home;
