import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminFeedback = () => {
  const [complaints, setComplaints] = useState([]);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    fetchAllComplaints();
  }, []);

  const fetchAllComplaints = async () => {
    try {
      const response = await axios.get('/api/complaints/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure the token is sent
        }
      });
      setComplaints(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFeedbackChange = (e, id) => {
    setFeedback({ ...feedback, [id]: e.target.value });
  };

  const handleFeedbackSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/complaints/${id}/feedback`, { feedback: feedback[id] }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Ensure the token is sent
        }
      });
      console.log(response.data);
      fetchAllComplaints();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Admin Feedback</h2>
      {complaints.map(complaint => (
        <div key={complaint._id}>
          <p><strong>{complaint.username}</strong>: {complaint.complaint}</p>
          <form onSubmit={e => handleFeedbackSubmit(e, complaint._id)}>
            <textarea value={feedback[complaint._id] || ''} onChange={e => handleFeedbackChange(e, complaint._id)} placeholder="Enter your feedback"></textarea>
            <button type="submit">Submit Feedback</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminFeedback;
