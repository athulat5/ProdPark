import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgImage from './../../images/home.jpg';

const ViewAllCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/industry1');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Inline styles with media query logic
  const containerStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px',
    color: 'white',
    position: 'relative',
    // Responsive design for smaller screens
    '@media (max-width: 600px)': {
      padding: '10px',
      backgroundPosition: 'top center',
    }
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2rem',
    // Adjust font size for mobile
    '@media (max-width: 600px)': {
      fontSize: '1.5rem',
    }
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    color: 'black',
    maxWidth: '500px',
    width: '100%',
    // Adjust for smaller screens
    '@media (max-width: 600px)': {
      maxWidth: '100%',
      padding: '15px',
      margin: '10px auto',
    }
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
    cursor: 'pointer',
    zIndex: '1000',
    // Adjust for smaller screens
    '@media (max-width: 600px)': {
      padding: '8px 16px',
      top: '10px',
      left: '10px',
    }
  };

  return (
    <div style={containerStyle}>
      <button style={backButtonStyle} onClick={handleBackClick}>Back</button> 
      <h1 style={headerStyle}>All Companies</h1>
      {companies.length > 0 ? (
        companies.map((company) => (
          <div key={company._id} style={cardStyle}>
            <h2>{company.username}</h2>
            <p>Email: {company.email}</p>
            <p>Address: {company.address}</p>
            <p>Phone Number: {company.phoneNumber}</p>
            <p>Land Square Feet: {company.landSquareFeet}</p>
            <p>Description: {company.industryDescription}</p>
          </div>
        ))
      ) : (
        <p>No companies found</p>
      )}
    </div>
  );
};

export default ViewAllCompanies;
