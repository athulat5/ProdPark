// src/pages/About.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import the CSS file for styling
import bgImage from './../images/home.jpg'; // Add your background image here

const aboutStyle = {
  position: 'relative',
  minHeight: '100vh',
  padding: '50px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: 'white', // Set text color to gray
  zIndex: 1,
};

const overlayStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'blur(8px)', // Apply blur to the background
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
};

const contentStyle = {
  position: 'relative',
  zIndex: 2, // Ensure content is above the blurred background
};

const buttonStyle = {
  backgroundColor: '#007bff', // Bootstrap blue color
  border: 'none',
  color: '#00000',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  marginBottom: '20px',
  transition: 'background-color 0.3s ease',
};

const About = () => {
  const navigate = useNavigate();

  return (
    <div style={aboutStyle}>
      {/* Blurred background overlay */}
      <div style={overlayStyle}></div>

      {/* Content with gray text */}
      <div style={contentStyle}>
        <button style={buttonStyle} onClick={() => navigate('/home2')}>Back to Home</button>

        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>About ProdPark</h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '30px', maxWidth: '800px' }}>
          ProdPark is an all-in-one software solution built for industrial areas to help manage and optimize the business operations of multiple production centers. It provides tools for managing raw material collection, monitoring production processes, maintaining inventory, addressing damage control, and automating sales workflows.
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '20px', maxWidth: '800px' }}>
          Designed to support companies in enhancing productivity and ensuring seamless operations, ProdPark offers:
        </p>
        <ul style={{ fontSize: '18px', textAlign: 'left', maxWidth: '800px', marginBottom: '30px' }}>
          <li>Robust stock and inventory management</li>
          <li>Efficient order processing for clients and customers</li>
          <li>Automated tracking of raw material purchases and usage</li>
          <li>Advanced analytics and reporting tools for actionable insights</li>
          <li>Compliance with business regulations and legal standards</li>
        </ul>
        <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '30px', maxWidth: '800px' }}>
          Our goal is to empower companies to reduce operational costs, increase productivity, and streamline their entire business ecosystem with a user-friendly platform.
        </p>

        <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>About the Developer</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.6', maxWidth: '800px' }}>
          This application was developed by Athul Anil, an MCA student and passionate software developer, focused on delivering innovative solutions for business challenges. With a solid foundation in the MERN stack and hands-on experience in software development, Athul Anil has built ProdPark to meet the needs of modern industries.
        </p>
      </div>
    </div>
  );
};

export default About;
