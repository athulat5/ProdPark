import React from 'react';
import bg from '../images/prodpark1.jpg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Background = () => {
  const backgroundStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
  };

  return( <div style={backgroundStyle}>
    <CustomNavbar></CustomNavbar>
  </div>
  );
}
  function CustomNavbar() {
  return (
  <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ProdPark</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Login</Nav.Link>
            <Nav.Link href="#pricing">Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default Background;
