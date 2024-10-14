import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from './../../images/home.jpg';

// Inline styles for container, background, and form
const containerStyle = {
  position: 'relative',
  minHeight: '100vh',
  overflow: 'hidden',
};

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100%',
  width: '100%',
  filter: 'blur(8px)',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
};

const formContainerStyle = {
  position: 'relative',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  maxWidth: '500px',
  width: '90%',
  margin: '50px auto',
  zIndex: 2,
};

const backButtonStyle = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  backgroundColor: '#007bff',
  border: 'none',
  color: '#fff',
  padding: '10px 15px',
  fontSize: '16px',
  cursor: 'pointer',
  borderRadius: '5px',
  zIndex: 3,
};

const IndustryRegistration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    idCard: null,
    landSquareFeet: '',
    industryDescription: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, idCard: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Password matching check
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:4000/api/industry1', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        alert('Registration request submitted successfully waite for Approval');
        navigate('/IndustryDashboard');
        // Optionally navigate to another page or reset the form here
      } else {
        alert('Error submitting registration request');
      }
    } catch (error) {
      alert('Error submitting registration request');
    }
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>
      <button style={backButtonStyle} onClick={() => navigate('/Home2')}>
        Back to Home
      </button>
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Industry Registration</h2>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              required
              rows={3}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ID Card</label>
            <input
              type="file"
              className="form-control"
              name="idCard"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Land Required (Square Feet)</label>
            <input
              type="number"
              className="form-control"
              name="landSquareFeet"
              placeholder="Enter land in square feet"
              value={formData.landSquareFeet}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Industry Description</label>
            <textarea
              className="form-control"
              name="industryDescription"
              placeholder="Describe the industry you plan to start"
              value={formData.industryDescription}
              onChange={handleChange}
              required
              rows={3}
            ></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndustryRegistration;
