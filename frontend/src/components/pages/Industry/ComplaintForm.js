import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../images/home.jpg'; // Update the path accordingly

const ComplaintForm = ({ currentUser = {} }) => {
  const [formData, setFormData] = useState({
    username: currentUser.username || '',
    complaint: ''
  });
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Submitting data:', formData);
    try {
      const response = await axios.post('/api/complaints', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure the token is sent
        }
      });
      console.log('Response:', response.data);
      fetchComplaints();
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('/api/complaints', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure the token is sent
        }
      });
      setComplaints(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div style={containerStyle}>
      <button style={backButtonStyle} onClick={() => navigate(-1)}>Back</button>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="username"
          value={formData.username}
          readOnly
          style={inputStyle}
        />
        <textarea
          name="complaint"
          value={formData.complaint}
          onChange={handleChange}
          placeholder="Enter your complaint"
          required
          style={textareaStyle}
        ></textarea>
        <button type="submit" style={buttonStyle}>Submit Complaint</button>
      </form>
      <h2 style={headingStyle}>Your Complaints</h2>
      {complaints.map(complaint => (
        <div key={complaint._id} style={complaintStyle}>
          <p><strong>{complaint.username}</strong>: {complaint.complaint}</p>
          <p><strong>Admin Feedback:</strong> {complaint.feedback ? complaint.feedback : 'No feedback yet'}</p>
        </div>
      ))}
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

const textareaStyle = {
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

const headingStyle = {
  textAlign: 'center',
  color: 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  margin: '20px 0'
};

const complaintStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '15px',
  margin: '10px 0',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center'
};

export default ComplaintForm;
