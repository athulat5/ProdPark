import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RPaymentPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    phone: '',
  });
  const navigate = useNavigate();

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/rawMaterials/${productId}`);
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
      const orderData = {
        rawMaterialId: productId,
        name: paymentDetails.name,
        cardDetails: {
          cardNumber: paymentDetails.cardNumber,
          expiryDate: paymentDetails.expiryDate,
          cvv: paymentDetails.cvv,
        },
      };
  
      const response = await axios.post('http://localhost:4000/api/rorders', orderData);
      alert(response.data.message); // Shows 'Payment successful!' message
      navigate('/IndustryDashboard'); // Redirect after successful payment
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
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
      </form>
    </div>
  );
};






// CSS Styles
const containerStyle = {
  padding: '20px',
  textAlign: 'center',
  maxWidth: '500px',
  margin: '0 auto',
  backgroundColor: '#f4f7f6',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
  marginBottom: '20px',
  color: '#333',
};

const productDetailsStyle = {
  marginBottom: '20px',
  textAlign: 'left',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  backgroundColor: '#fff',
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
  fontSize: '16px',
  color: '#333',
};

const buttonStyle = {
  padding: '12px 25px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  width: '80%',
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
  cursor: 'pointer',
};

export default RPaymentPage;
