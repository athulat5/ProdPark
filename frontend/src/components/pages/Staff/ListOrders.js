// src/pages/ListOrders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/rawMaterials/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>List of Orders</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Raw Material</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Delivery Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.userId.name}</td>
              <td>{order.rawMaterialId.name}</td>
              <td>{order.quantity}</td>
              <td>{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>
                <p>{order.deliveryAddress.companyName}</p>
                <p>{order.deliveryAddress.sector}</p>
                <p>{order.deliveryAddress.bulding}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOrders;
