// src/pages/About.js
import React from 'react';
import Layout from '../Layout';
import './style.css'; // Import CSS file for styling

const About = () => {

  return (
    <div>
      <Layout/>
      <h1>About ProdPark</h1>
      <p>
        ProdPark is a comprehensive software solution tailored for industrial areas, designed to manage and optimize business activities across multiple production centers. 
        Our platform allows industries to efficiently manage the collection of raw materials, streamline production processes, maintain inventory, handle damage control, and automate sales operations.
      </p>
      <p>
        With ProdPark, businesses can achieve:
      </p>
      <ul>
        <li>Efficient stock and inventory management</li>
        <li>Seamless order processing for clients and customers</li>
        <li>Automated tracking of raw material purchases and usage</li>
        <li>Advanced analytics and reporting tools for business insights</li>
        <li>Easy compliance with legal procedures and business regulations</li>
      </ul>
      <p>
        Our mission is to help companies increase productivity, reduce operational costs, and enhance overall business performance through a user-friendly, all-in-one software solution.
      </p>
      <h2>About the Developer</h2>
      <p>
        This application was developed by [Your Name], a passionate software developer with a keen interest in building innovative and efficient software solutions for complex business processes.
      </p>
    </div>
  );
};

export default About;
