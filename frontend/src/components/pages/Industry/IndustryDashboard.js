import React from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from './../../images/home.jpg';

const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100vw',
  overflowY: 'auto',
  paddingBottom: '50px',
};

const cardStyle = {
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
};

const IndustryDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddProduct = () => {
    navigate('/AddProduct');
  };

  const handleChangePassword = () => {
    navigate('/change-password'); // Navigate to the Change Password page
  };

  return (
    <div style={backgroundStyle}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/IndustryDashboard">Industry Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={handleChangePassword} style={{ cursor: 'pointer' }}>
                Change Password
              </Nav.Link>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="pt-5">
        <Row className="g-4 justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card style={cardStyle}>
              <Card.Body>
                <Card.Title>Add Product Details</Card.Title>
                <Card.Text>
                  Add new products to showcase to potential customers.
                </Card.Text>
                <Button variant="primary" onClick={handleAddProduct}>
                  Add Product
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IndustryDashboard;
