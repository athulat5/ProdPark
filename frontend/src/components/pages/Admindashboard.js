import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from './../images/home.jpg'; // Import your background image

// Inline styles for background and content
const backgroundStyle = {
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const contentStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '10px',
  padding: '20px',
  marginTop: '20px',
  width: '80%',
  maxWidth: '800px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const cardStyle = {
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s',
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div style={backgroundStyle}>
      <Navbar bg="dark" variant="dark" style={{ width: '100%' }}>
        <Container>
          <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link as={Link} to="/Staffreg" className="nav-link">Add Staff</Nav.Link>
            <Nav.Link as={Link} to="/StaffManagement" className="nav-link">View Staff</Nav.Link>
            <Nav.Link as={Link} to="/admin/view-companies" className="nav-link">View Companies</Nav.Link>
            <Nav.Link as={Link} to="/admin/view-complaints" className="nav-link">View Complaints</Nav.Link> */}
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>

      <div className="container mt-4" style={contentStyle}>
        <h2>Welcome to Admin Dashboard</h2>
        <Row className="g-4 mt-4">
          <Col md={6}>
            <Card style={cardStyle} className="p-3">
              <Card.Body>
                <Card.Title>Add Staff</Card.Title>
                <Card.Text>
                  Add new staff members to manage your operations.
                </Card.Text>
                <Link to="/Staffreg">
                  <Button variant="primary">Go to Add Staff</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={cardStyle} className="p-3">
              <Card.Body>
                <Card.Title>Industry Approve</Card.Title>
                <Card.Text>
                View and Approve Client
                </Card.Text>
                <Link to="/IndustryApproval">
                  <Button variant="primary">Industry Approve</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card style={cardStyle} className="p-3">
              <Card.Body>
                <Card.Title>View Staff</Card.Title>
                <Card.Text>
                  View and manage all registered staff members.
                </Card.Text>
                <Link to="/StaffManagement">
                  <Button variant="primary">Go to View Staff</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={cardStyle} className="p-3">
              <Card.Body>
                <Card.Title>View Companies</Card.Title>
                <Card.Text>
                  Review the list of registered companies.
                </Card.Text>
                <Link to="/IndustryList">
                  <Button variant="primary">Go to View Companies</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={cardStyle} className="p-3">
              <Card.Body>
                <Card.Title>View Complaints</Card.Title>
                <Card.Text>
                  Check all complaints lodged by customers.
                </Card.Text>
                <Link to="/admin/view-complaints">
                  <Button variant="primary">Go to View Complaints</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>

         
        </Row>
      </div>
    </div>
  );
};

export default AdminDashboard;
