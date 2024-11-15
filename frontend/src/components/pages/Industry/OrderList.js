import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundImage from './../../images/home.jpg'; // Update path to your background image
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const handleBackClick = () => {
    navigate(-1); 
  };

  // Inline styles for background and table
  const containerStyle = {
    padding: '20px',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light overlay to make text readable
    color: 'black',
  };

  const thStyle = {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    borderBottom: '2px solid #ddd',
  };

  const tdStyle = {
    padding: '10px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#fff',
  };

  const backButtonStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <button style={backButtonStyle} onClick={handleBackClick}>Back</button>
      <h2 style={headingStyle}>Order List</h2>
      {orders.length > 0 ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>House Name</th>
              <th style={thStyle}>City</th>
              <th style={thStyle}>Locality</th>
              <th style={thStyle}>Pincode</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td style={tdStyle}>{order.name}</td>
                <td style={tdStyle}>{order.houseName}</td>
                <td style={tdStyle}>{order.city}</td>
                <td style={tdStyle}>{order.locality}</td>
                <td style={tdStyle}>{order.pincode}</td>
                <td style={tdStyle}>{order.phone}</td>
                <td style={tdStyle}>{new Date(order.orderDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ color: '#fff', textAlign: 'center' }}>No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
