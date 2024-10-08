import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
  padding: '0 20px', // Add padding for smaller screens
};



const navbarStyle = {
  backgroundColor: '#f8f9fa',
};

const CustomNavbar = () => {
  return (
    <>
      <Navbar style={navbarStyle} expand="lg" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ProdPark</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
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
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={homeStyle}>
        
      </div>
    </>
  );
};

export default CustomNavbar;
