import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminDashboard() {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/Staffreg'>Add Staff</Nav.Link>
            <Nav.Link as={Link} to="/admin/view-companies">View Companies</Nav.Link>
            <Nav.Link as={Link} to="/admin/view-complaints">View Complaints</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>
      <div className="container mt-4">
        <h2>Welcome to Admin Dashboard</h2>
        {/* Content will go here */}
      </div>
    </div>
  );
}

export default AdminDashboard;
