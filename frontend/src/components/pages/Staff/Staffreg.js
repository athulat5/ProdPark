import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from './../../images/home.jpg';

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat', 
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  position: 'relative',
  paddingTop: '50px',
};

const formContainerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  zIndex: 2,
  width: '90%', // Adjusted width for better responsiveness
  maxWidth: '500px',
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

const StaffRegistration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate input fields
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validateMobileNumber(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('mobileNumber', mobileNumber);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('photo', photo);

    setLoading(true); // Start loading
    try {
      const response = await fetch(`http://localhost:4000/api/staff/register`, {
        method: 'POST',
        body: formData,
      });
      
      // const data = await response.json();
      // setLoading(false); // Stop loading
      if (response.ok) {
        alert('Registration request submitted successfully');
        navigate('/Admindashboard');
      } else {
        setError('Error submitting registration request username exits');
      }
    } catch (error) {
      // setLoading(false); // Stop loading
      setError('Server error, please try again later.'+error);

    }
  };

  const handleReset = () => {
    setUsername('');
    setEmail('');
    setMobileNumber('');
    setPassword('');
    setConfirmPassword('');
    setPhoto(null);
    setError(null);
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateMobileNumber = (number) => /^[0-9]{10}$/.test(number);

  return (
    <div style={backgroundStyle}>
      <button style={backButtonStyle} onClick={() => navigate(-1)}>
        Back to Home
      </button>
      <div style={formContainerStyle}>
        <Form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Staff Registration</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {loading && <Alert variant="info">Submitting your registration...</Alert>} {/* Loading state */}

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
              isInvalid={email && !validateEmail(email)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              isInvalid={mobileNumber && !validateMobileNumber(mobileNumber)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid 10-digit mobile number.
            </Form.Control.Feedback>
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
              isInvalid={confirmPassword && password !== confirmPassword}
              required
            />
            <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
            Register
          </Button>
          <Button variant="secondary" type="button" onClick={handleReset} className="w-100">
            Reset
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default StaffRegistration;
