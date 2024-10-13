import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComplaintForm = ({ currentUser = {} }) => {
  const [formData, setFormData] = useState({
    username: currentUser.username || '',
    complaint: ''
  });
  const [complaints, setComplaints] = useState([]);

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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={formData.username} readOnly />
        <textarea name="complaint" value={formData.complaint} onChange={handleChange} placeholder="Enter your complaint" required></textarea>
        <button type="submit">Submit Complaint</button>
      </form>

      <h2>Your Complaints</h2>
      {complaints.map(complaint => (
        <div key={complaint._id}>
          <p><strong>{complaint.username}</strong>: {complaint.complaint}</p>
          <p><strong>Admin Feedback:</strong> {complaint.feedback ? complaint.feedback : 'No feedback yet'}</p>
        </div>
      ))}
    </div>
  );
};

export default ComplaintForm;
