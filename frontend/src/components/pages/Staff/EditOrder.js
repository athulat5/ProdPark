import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams

const EditOrder = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams(); // Get the order ID from route parameters

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/rawMaterialsorder/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/rawMaterialsorder/orders/${id}`);
      alert('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order');
    }
  };

  const handleStatusChange = async (status) => {
    try {
      await axios.put(`http://localhost:4000/api/rawMaterialsorder/orders/${id}`, { status });
      alert('Order status updated');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order');
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Order</h2>
      <div>
        <p>User: {order.userId.name}</p>
        <p>Raw Material: {order.rawMaterialId.name}</p>
        <p>Quantity: {order.quantity}</p>
        <p>Total Price: {order.totalPrice}</p>
        <p>Status: {order.status}</p>
        <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
        <div>
          <p>Delivery Address:</p>
          <p>Company Name: {order.deliveryAddress.companyName}</p>
          <p>Sector: {order.deliveryAddress.sector}</p>
          <p>Building: {order.deliveryAddress.bulding}</p>
        </div>
      </div>
      <button onClick={() => handleStatusChange('Completed')}>Mark as Completed</button>
      <button onClick={handleDelete}>Delete Order</button>
    </div>
  );
};

export default EditOrder;
