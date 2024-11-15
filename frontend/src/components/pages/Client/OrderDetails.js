import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './../../../AuthProvider';

const OrderDetailsPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext); // Get token from AuthContext

  useEffect(() => {
    
    if (token) {
      const fetchOrders = async () => {
       
        try {
            
          const response = await axios.get('http://localhost:4000/api/orders', {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
          });
          setOrders(response.data);
        } catch (err) {
          setError('Failed to fetch orders');
        }
      };

      fetchOrders();
    }
  }, [token]);

  return (
    
    <div>
      <h1>Your Orders</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id}>
            <h3>Order ID: {order._id}</h3>
            <p>Product Name: {order.productName}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Status: {order.status}</p>
            <p>Price: ${order.price}</p>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderDetailsPage;
