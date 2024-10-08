import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from './../../images/home.jpg';

const containerStyle = {
  position: 'relative',
  height: '100vh',
  width: '100vw',
  overflow: 'hidden',
};

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  filter: 'blur(8px)',
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: -1,
};

const contentStyle = {
  position: 'relative',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '10px',
  padding: '20px',
  marginTop: '20px',
  width: '90%',
  maxWidth: '800px',
  zIndex: 2,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headingStyle = {
  marginBottom: '30px',
  width: '100%',
  textAlign: 'center',
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

const cardStyle = {
  marginBottom: '15px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const IndustryManagement = () => {
  const [industries, setIndustries] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState({
    id: null,
    username: '',
    email: '',
    address: '',
    phoneNumber: '',
    password: '',
    idCard: '',
    landSquareFeet: 0,
    industryDescription: '',
  });

  useEffect(() => {
    fetchIndustries();
  }, []);

//   const fetchIndustries = async () => {
//     const response = await axios.get('/api/industry1');
//     setIndustries(response.data);
//   };

  const deleteIndustry = async (id) => {
    await axios.delete(`/api/industry1/${id}`);
    fetchIndustries();
  };

  const editIndustry = (industry) => {
    setEditing(true);
    setCurrentIndustry({
      id: industry._id,
      username: industry.username,
      email: industry.email,
      address: industry.address,
      phoneNumber: industry.phoneNumber,
      password: industry.password,
      idCard: industry.idCard,
      landSquareFeet: industry.landSquareFeet,
      industryDescription: industry.industryDescription,
    });
  };
 
  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const response = await axios.get('/api/industry1');
      if (response && response.data) {
        setIndustries(response.data);
      } else {
        console.log('No data found');
      }
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  };


  const updateIndustry = async (e) => {
    e.preventDefault();
    await axios.put(`/api/industry1/${currentIndustry.id}`, currentIndustry);
    setEditing(false);
    fetchIndustries();
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>
      <button style={backButtonStyle} onClick={() => window.history.back()}>
        Back to Dashboard
      </button>
      <div style={contentStyle}>
        <h1 style={headingStyle}>Industry Management</h1>
        {editing ? (
          <div>
            <h2 className="mb-3">Edit Industry</h2>
            <form onSubmit={updateIndustry}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={currentIndustry.username}
                  onChange={(e) => setCurrentIndustry({ ...currentIndustry, username: e.target.value })}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={currentIndustry.email}
                  onChange={(e) => setCurrentIndustry({ ...currentIndustry, email: e.target.value })}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={currentIndustry.address}
                  onChange={(e) => setCurrentIndustry({ ...currentIndustry, address: e.target.value })}
                  placeholder="Address"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={currentIndustry.phoneNumber}
                  onChange={(e) => setCurrentIndustry({ ...currentIndustry, phoneNumber: e.target.value })}
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={currentIndustry.password}
                  onChange={(e) => setCurrentIndustry({ ...currentIndustry, password: e.target.value })}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={currentIndustry.idCard}
                  onChange={(e) => setCurrentIndustry({ ...currentIndustry, idCard: e.target.value })}
                  placeholder="ID Card"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  value={currentIndustry.landSquareFeet}
                  onChange={(e) => setCurrentIndustry({ ...currentIndustry, landSquareFeet: e.target.value })}
                  placeholder="Land Square Feet"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  value={currentIndustry.industryDescription}
                  onChange={(e) => setCurrentIndustry({ ...currentIndustry, industryDescription: e.target.value })}
                  placeholder="Industry Description"
                  rows="3"
                  required
                ></textarea>
              </div>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <div className="list-group">
              {industries.map((industry) => (
                <div key={industry._id} className="list-group-item d-flex justify-content-between align-items-center" style={cardStyle}>
                  <div>
                    <h5 className="mb-1">{industry.username}</h5>
                    <p className="mb-1">{industry.email} - {industry.address}</p>
                  </div>
                  <div>
                    <Button variant="warning" className="me-2" onClick={() => editIndustry(industry)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => deleteIndustry(industry._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndustryManagement;
