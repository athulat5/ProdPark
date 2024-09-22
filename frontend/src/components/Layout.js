// src/components/Layout.js
import React from 'react';
import CustomNavbar from './CustomNavbar'; // Import the Navbar component

const Layout = ({ children }) => {
  return (
    <>
      <CustomNavbar /> 
      <main>{children}</main> 
    </>
  );
};

export default Layout;
