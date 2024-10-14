import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../images/home.jpg';

const CheckApprovalStatus = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/industry1/checkapproval', { username });
      setMessage(response.data.message);
      setFadeIn(true);
    } catch (error) {
      console.error('Error checking approval status:', error);
      setMessage('Not Approved, Wait For Approval');
      setFadeIn(true);
    }
  };

  return (
    <div style={containerStyle}>
      <button style={backButtonStyle} onClick={() => navigate(-1)}>Back</button>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Check Approval Status</button>
      </form>
      {message && (
        <p style={{ ...messageStyle, opacity: fadeIn ? 1 : 0 }} className="fade-in">{message}</p>
      )}
    </div>
  );
};

// Inline CSS with Background Image and Mobile-Friendly Design
const containerStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
};

const backButtonStyle = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '400px',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px'
};

const messageStyle = {
    marginTop: '20px',
    color: 'black',
    padding: '10px 15px ',
    borderRadius: '10px',
    // border: '1px solid #ccc', 
    backgroundColor: 'white',
    fontSize: '24px', 
    transition: 'opacity 0.5s ease-in-out'
  
};

export default CheckApprovalStatus;
