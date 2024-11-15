import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgImage from './../../images/home.jpg';

const AddRawMaterial = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/rawMaterials', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert(response.data.message);
      navigate('/StaffDashboard');
    } catch (error) {
      console.error('Error adding raw material:', error);
      alert('Failed to add raw material');
    }
  };

  return (
    <div style={backgroundStyle}>
      <button style={backButtonStyle} onClick={() => navigate('/staffDashboard')}>
        &larr; Back to Dashboard
      </button>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Add Raw Material</h2>
        <form onSubmit={handleSubmit}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={textareaStyle}
            ></textarea>
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={submitButtonStyle}>
            Add Raw Material
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
const backgroundStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const containerStyle = {
  width: '90%',
  maxWidth: '500px',
  padding: '25px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '15px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
};

const headingStyle = {
  fontSize: '24px',
  color: '#333',
  marginBottom: '20px',
};

const formGroupStyle = {
  marginBottom: '15px',
  textAlign: 'left',
};

const labelStyle = {
  display: 'block',
  fontWeight: 'bold',
  marginBottom: '5px',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const textareaStyle = {
  width: '100%',
  height: '100px',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  resize: 'none',
};

const submitButtonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#28a745',
  color: 'white',
  fontSize: '16px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const backButtonStyle = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default AddRawMaterial;
