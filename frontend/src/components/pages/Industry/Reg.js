import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bg3 from './../../images/home.jpg'; 

const CompanyRegistration = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    location: '',
    industryType: '',
    contactNumber: '',
    email: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:5000/api/companies/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Company registered successfully.');
        setTimeout(() => navigate('/view-companies'), 2000); // Redirect to the view page after 2 seconds
      } else {
        setError(data.message || 'Failed to register company.');
      }
    } catch (error) {
      setError('Server error, please try again later.');
    }
  };

  // Handle form reset
  const handleReset = () => {
    setCompanyData({
      name: '',
      location: '',
      industryType: '',
      contactNumber: '',
      email: '',
    });
    setError(null);
    setSuccess(null);
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      {/* Background Blur Layer */}
      <div
        style={{
          backgroundImage: `url(${bg3})`,
          backgroundSize: 'cover',
          filter: 'blur(8px)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      />

      {/* Back Button */}
      <Button
        variant="secondary"
        onClick={() => navigate('/home2')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 1,
        }}
      >
        Back
      </Button>

      {/* Form Container */}
      <Container className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
        <div className="p-4 rounded bg-light" style={{ width: '100%', maxWidth: '600px' }}>
          <h2 className="text-center mb-4">Company Registration</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter company name"
                value={companyData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter company location"
                value={companyData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Industry Type</Form.Label>
              <Form.Control
                type="text"
                name="industryType"
                placeholder="Enter industry type"
                value={companyData.industryType}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNumber"
                placeholder="Enter contact number"
                value={companyData.contactNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={companyData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Register Company
            </Button>

            <Button variant="secondary" className="w-100" onClick={handleReset}>
              Reset
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default CompanyRegistration;
