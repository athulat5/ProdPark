import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from './../images/home.jpg';

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

const formContainerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
  zIndex: 2,
  width: '100%',
  maxWidth: '400px',
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

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Default role is admin
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let endpoint;
      let dashboard;
      switch (role) {
        case 'admin':
          endpoint = '/api/admin/login';
          dashboard = '/Admindashboard';
          break;
        case 'staff':
          endpoint = '/api/staff/login';
          dashboard = '/StaffDashboard';
          break;
        case 'industry':
          endpoint = '/api/industry1/login';
          dashboard = '/IndustryDashboard';
          break;
        case 'client':
          endpoint = '/api/client/login';
          dashboard = '/ClientDashboard';
          break;
        default:
          throw new Error('Invalid role selected');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert(data.message);
        navigate(dashboard);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Server error, please try again later. ' + error.message);
    }
  };

  return (
    <div style={backgroundStyle}>
      <button style={backButtonStyle} onClick={() => navigate('/home2')}>
        Back to Home
      </button>

      <div style={formContainerStyle}>
        <Form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Login to ProdPark</h2>

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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="industry">Industry</option>
              <option value="client">Client</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
