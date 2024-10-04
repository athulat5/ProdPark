import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from './../../images/home.jpg'; // Import your background image

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
  filter: 'blur(8px)', // Blur the background
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
  margin: 'auto', // Center the content horizontally
  display: 'flex',
  flexDirection: 'column', // Stack children vertically
  alignItems: 'center', // Center items horizontally
};

const headingStyle = {
  marginBottom: '30px', // Space below the heading
  width: '100%', // Full width for centering
  textAlign: 'center', // Center text
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

const staffImageStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  marginRight: '10px',
};

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentStaff, setCurrentStaff] = useState({
    id: null,
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    photo: '',
  });
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    const response = await axios.get('/api/staff');
    setStaff(response.data);
  };

  const deleteStaff = async (id) => {
    await axios.delete(`/api/staff/${id}`);
    fetchStaff();
  };

  const editStaff = (staff) => {
    setEditing(true);
    setCurrentStaff({
      id: staff._id,
      username: staff.username,
      email: staff.email,
      mobileNumber: staff.mobileNumber,
      password: staff.password,
      photo: staff.photo,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
    setCurrentStaff({ ...currentStaff, photo: URL.createObjectURL(file) });
  };

  const updateStaff = async (e) => {
    e.preventDefault();
    let updatedStaff = { ...currentStaff };

    if (photoFile) {
      const formData = new FormData();
      formData.append('file', photoFile);
      try {
        const uploadResponse = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        updatedStaff.photo = uploadResponse.data.filePath; // Assuming API returns the uploaded file path
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    await axios.put(`/api/staff/${currentStaff.id}`, updatedStaff);
    setEditing(false);
    fetchStaff();
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>
      <button style={backButtonStyle} onClick={() => window.location.href = '/AdminDashboard'}>
        Back to Dashboard
      </button>
      <div style={contentStyle}>
        <h1 style={headingStyle}>Staff Management</h1> {/* Updated Heading Style */}
        {editing ? (
          <div>
            <h2 className="mb-3">Edit Staff</h2>
            <form onSubmit={updateStaff}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={currentStaff.username}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, username: e.target.value })}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={currentStaff.email}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, email: e.target.value })}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={currentStaff.mobileNumber}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, mobileNumber: e.target.value })}
                  placeholder="Mobile Number"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={currentStaff.password}
                  onChange={(e) => setCurrentStaff({ ...currentStaff, password: e.target.value })}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={handlePhotoChange}
                  accept="image/*"
                />
              </div>
              <div className="mb-3">
                {currentStaff.photo && (
                  <img
                    src={currentStaff.photo}
                    alt="Staff Preview"
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                  />
                )}
              </div>
              
              <Button variant="primary" type="submit">Update</Button>
            </form>
          </div>
        ) : (
          <div>
            
            <div className="list-group">
              {staff.map((staff) => (
                <div key={staff._id} className="list-group-item d-flex justify-content-between align-items-center" style={cardStyle}>
                  <div className="d-flex align-items-center">
                    <img src={staff.photo} alt={staff.username} style={staffImageStyle} />
                    <div>
                      <h5 className="mb-1">{staff.username}</h5>
                      <p className="mb-1">{staff.email} - {staff.mobileNumber}</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="warning" className="me-2" onClick={() => editStaff(staff)}>Edit</Button>
                    <Button variant="danger" onClick={() => deleteStaff(staff._id)}>Delete</Button>
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

export default StaffManagement;
