import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'; // Import NavDropdown
import bg from './../images/home.jpg';

const homeStyle = {
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

function CustomNavbar() {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ProdPark</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Login">Login</Nav.Link>

            {/* Dropdown for Industry Navigation */}
            <NavDropdown title="Industry" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/industry/list">Industry List</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/IndustryRegistration">Add New Industry</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/ClientReg">New Client Registration</Nav.Link>
            <Nav.Link as={Link} to="/Indusrty">Existing Industry</Nav.Link>
            <Nav.Link as={Link} to="/About">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div style={homeStyle}>
        {/* You can add more content here if needed */}
      </div>
    </>
  );
}

export default CustomNavbar;
