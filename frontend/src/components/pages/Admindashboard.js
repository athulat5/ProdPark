import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminDashboard() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/add-staff">Add Staff</Nav.Link>
            <Nav.Link as={Link} to="/admin/view-companies">View Companies</Nav.Link>
            <Nav.Link as={Link} to="/admin/view-products">View Products</Nav.Link>
            <Nav.Link as={Link} to="/admin/view-complaints">View Complaints</Nav.Link>
          </Nav>
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
