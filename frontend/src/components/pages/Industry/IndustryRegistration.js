import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from '../../images/home.jpg';

// Inline styles
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
  zIndex: 1, // Keep background behind other elements
};

const formContainerStyle = {
  position: 'relative',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  maxWidth: '500px',
  width: '90%',
  margin: '50px auto', // Center the form with some margin at the top
  zIndex: 2, // Keep form above the blurred background
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
  zIndex: 3, // Keep button above everything else
};

const IndustryRegistration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idCard, setIdCard] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('idCard', idCard);

    try {
      const response = await fetch(`http://localhost:4000/api/industry/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate('/Home2');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Server error, please try again later.');
    }
  };

  const handleReset = () => {
    setUsername('');
    setEmail('');
    setAddress('');
    setPhoneNumber('');
    setPassword('');
    setConfirmPassword('');
    setIdCard(null);
    setError(null);
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div> {/* Single background div for blur effect */}
      <button style={backButtonStyle} onClick={() => navigate('/home2')}>
        Back to Home
      </button>
      <div style={formContainerStyle}>
        <Form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Industry Registration</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea" // Changed to textarea
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3} // Adjust number of visible rows
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ID Card</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setIdCard(e.target.files[0])}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Register
            </Button>
            <Button variant="secondary" type="button" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default IndustryRegistration;
