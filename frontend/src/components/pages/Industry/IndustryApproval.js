import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from '../../images/home.jpg';

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

const contentContainerStyle = {
  position: 'relative',
  zIndex: 2,
  padding: '20px',
  maxWidth: '1000px',
  margin: '0 auto',
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

const IndustryApproval = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/industry');

      // Log the response status
      console.log('Response status:', response.status);
      
      // Check if response is okay
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Log the fetched data
      console.log('Fetched requests:', data);
      
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests', error);
    }
  };

  const approveRequest = async (id) => {
    console.log("Approving request with ID:", id); // Log the ID for debugging
    try {
      const response = await fetch(`http://localhost:4000/api/industry1/approve/${id}`, {
        method: 'POST',
      });
      if (response.ok) {
        fetchRequests(); // Refresh the request list
      } else {
        console.error('Error approving request', response.status);
      }
    } catch (error) {
      console.error('Error approving request', error);
    }
  };
  

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>
      <button style={backButtonStyle} onClick={() => navigate('/AdminDashboard')}>
        Back to Home
      </button>
      <div style={contentContainerStyle}>
        <h1 className="text-center mb-4">Industry Approval</h1>
        <div className="row">
          {requests.length === 0 ? (
            <div className="col-12 text-center">
              <p>No requests to display.</p>
            </div>
          ) : (
            requests.map((request) => (
              <div key={request._id} className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Username: {request.username}</h5>
                    <p className="card-text">Email: {request.email}</p>
                    <p className="card-text">Address: {request.address}</p>
                    <p className="card-text">Phone Number: {request.phoneNumber}</p>
                    <p className="card-text">Land Square Feet: {request.landSquareFeet}</p>
                    <p className="card-text">Industry Description: {request.industryDescription}</p>
                    <p className="card-text">
                      ID Card: <a href={`http://localhost:4000/${request.idCard}`} target="_blank" rel="noopener noreferrer">View Document</a>
                    </p>
                    <button
                      className="btn btn-success"
                      onClick={() => approveRequest(request._id)}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default IndustryApproval;
