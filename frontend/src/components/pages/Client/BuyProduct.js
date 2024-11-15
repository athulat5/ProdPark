import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bg from '../../images/home.jpg';

const BuyProduct = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleBuy = productId => {
    navigate(`/payment/${productId}`); // Redirect to the payment page with product ID
  };

  const handleBackClick = () => {
    navigate('/ClientDashboard'); 
  };

  return (
    <div style={containerStyle}>
      <button style={backButtonStyle} onClick={handleBackClick}>Back</button>
      <h1 style={headingStyle}>Products for Sale</h1>
      <div style={productListStyle}>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} style={productCardStyle}>
              <h2>{product.name}</h2>
              <img
                src={`http://localhost:4000/uploads/products/${product.image}`}
                alt={product.name}
                style={imageStyle}
              />
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <button style={buyButtonStyle} onClick={() => handleBuy(product._id)}>Buy</button>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

// Inline CSS Styles with Mobile Adjustments
const containerStyle = {
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  padding: '20px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
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

const headingStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  color: 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  fontSize: '24px'
};

const productListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  maxWidth: '1200px',
  width: '100%',
};

const productCardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '15px',
  margin: '10px',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  flex: '1 1 calc(100% - 40px)',
  maxWidth: '300px',
  width: '100%'
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: '5px',
};

const buyButtonStyle = {
  padding: '10px 15px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px'
};

export default BuyProduct;
