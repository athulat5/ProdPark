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

const ClientDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleViewCompanies = () => {
    navigate('/ViewAllCompanies');
  };

  const handleBuyProducts = () => {
    navigate('/BuyProduct');
  };

  return (
    <div style={backgroundStyle}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="\ClientDashboard">Client Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
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
                <Card.Title>View Companies</Card.Title>
                <Card.Text>
                  Explore available companies and their offerings.
                </Card.Text>
                <Button variant="primary" onClick={handleViewCompanies}>
                  View Companies
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Card style={cardStyle}>
              <Card.Body>
                <Card.Title>Buy Products</Card.Title>
                <Card.Text>
                  Purchase products directly from the companies.
                </Card.Text>
                <Button variant="primary" onClick={handleBuyProducts}>
                  Buy Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ClientDashboard;
