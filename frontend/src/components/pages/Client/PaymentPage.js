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
    // userName: '',
    // address: '',
    name: '',
    houseName: '',
    city: '',
    locality: '',
    pincode: '',
    phone: '',
  });
  const [successMessage] = useState('');
  const navigate = useNavigate();

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/orders', {
        productId,
        ...paymentDetails,
      });
      alert('Payment successful!');
       navigate('/BuyProduct');
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleBackClick = () => {
    navigate('/BuyProduct'); 
  };

  return (
    <div style={containerStyle}>
      <button style={backButtonStyle} onClick={handleBackClick}>Back</button>
      <h1 style={headingStyle}>Payment for {product?.name}</h1>
      
      {product && (
        <div style={productDetailsStyle}>
          <h2>{product?.name}</h2>
          <p>{product?.description}</p>
          <p><strong>Price: ${product?.price}</strong></p>
        </div>
      )}

      <form onSubmit={handlePayment} style={formStyle}>
        {/* <input
          type="text"
          name="userName"
          placeholder="User Name"
          value={paymentDetails.userName}
          onChange={handleChange}
          style={inputStyle}
          required
        /> */}
        {/* <input
          type="text"
          name="address"
          placeholder="Address"
          value={paymentDetails.address}
          onChange={handleChange}
          style={inputStyle}
          required
        /> */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={paymentDetails.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="houseName"
          placeholder="House Name"
          value={paymentDetails.houseName}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={paymentDetails.city}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="locality"
          placeholder="Locality"
          value={paymentDetails.locality}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={paymentDetails.pincode}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={paymentDetails.phone}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date"
          value={paymentDetails.expiryDate}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentDetails.cvv}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>Pay</button>
        {successMessage && <p style={successMessageStyle}>{successMessage}</p>}
      </form>
    </div>
  );
};

// Styles (no changes needed here)




// Styles
const containerStyle = {
  padding: '20px',
  textAlign: 'center',
  maxWidth: '500px',
  margin: '0 auto',
};

const headingStyle = {
  marginBottom: '20px',
};

const productDetailsStyle = {
  marginBottom: '20px',
  textAlign: 'left',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle = {
  marginBottom: '15px',
  padding: '10px',
  width: '80%',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const successMessageStyle = {
  color: 'green',
  fontWeight: 'bold',
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

export default PaymentPage;
