import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/About">About</Nav.Link>
            <Nav.Link as={Link} to="/features">Features</Nav.Link>
            <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div style={homeStyle}>
        
      </div>
    </>
  );
}

export default CustomNavbar;
