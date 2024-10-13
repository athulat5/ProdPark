import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
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
  const [showModal, setShowModal] = useState(false);
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
  const [newPassword, setNewPassword] = useState(''); // For handling password changes

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

  const deleteIndustry = async (id) => {
    await axios.delete(`/api/industry1/${id}`);
    fetchIndustries();
  };

  const editIndustry = (industry) => {
    setCurrentIndustry({
      id: industry._id,
      username: industry.username,
      email: industry.email,
      address: industry.address,
      phoneNumber: industry.phoneNumber,
      password: '', // Don't show hashed password
      idCard: industry.idCard,
      landSquareFeet: industry.landSquareFeet,
      industryDescription: industry.industryDescription,
    });
    setNewPassword(''); // Clear password input
    setShowModal(true);
  };

  const updateIndustry = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...currentIndustry,
    };

    // Only update the password if the user has entered a new one
    if (newPassword) {
      updatedData.password = newPassword;
    }

    await axios.put(`/api/industry1/${currentIndustry.id}`, updatedData);
    setShowModal(false);
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

      {/* Modal for Editing Industry */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Industry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateIndustry}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={currentIndustry.username}
                onChange={(e) => setCurrentIndustry({ ...currentIndustry, username: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentIndustry.email}
                onChange={(e) => setCurrentIndustry({ ...currentIndustry, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={currentIndustry.address}
                onChange={(e) => setCurrentIndustry({ ...currentIndustry, address: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={currentIndustry.phoneNumber}
                onChange={(e) => setCurrentIndustry({ ...currentIndustry, phoneNumber: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password (Enter new password to change, otherwise leave blank)</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
              />
            </Form.Group>
            <Form.Group className="mb-3">
  <Form.Label>ID Card</Form.Label>
  <Form.Control
    type="text"
    value={currentIndustry.idCard}
    readOnly // This makes the field non-editable
    required
  />
</Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Land Square Feet</Form.Label>
              <Form.Control
                type="number"
                value={currentIndustry.landSquareFeet}
                onChange={(e) => setCurrentIndustry({ ...currentIndustry, landSquareFeet: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Industry Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentIndustry.industryDescription}
                onChange={(e) => setCurrentIndustry({ ...currentIndustry, industryDescription: e.target.value })}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default IndustryManagement;
