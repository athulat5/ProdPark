import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    userName: '',
    address: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }, [productId]);

  const handleChange = e => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = async e => {
    e.preventDefault();
    try {
      // Process payment logic here
      console.log('Processing payment', paymentDetails);

      // Save payment details to the backend
      await axios.post('http://localhost:4000/api/payments', paymentDetails);

      navigate('/thankyou'); // Redirect to a thank you page or confirmation
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Payment for {product?.name}</h1>
      <form onSubmit={handlePayment}>
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          value={paymentDetails.userName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={paymentDetails.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date"
          value={paymentDetails.expiryDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentDetails.cvv}
          onChange={handleChange}
          required
        />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  textAlign: 'center',
  maxWidth: '500px',
  margin: '0 auto'
};

const headingStyle = {
  marginBottom: '20px'
};

export default PaymentPage;
