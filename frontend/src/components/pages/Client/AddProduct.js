import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bg from '../../images/home.jpg';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    industry: ''
  });
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('quantity', formData.quantity);
    data.append('industry', formData.industry);
    data.append('image', image);

    try {
      const response = await axios.post('http://localhost:4000/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setSuccessMessage('Product added successfully!');
      setTimeout(() => {
        navigate('/IndustryDashboard');
      }, 2000);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div style={containerStyle}>
      <button style={backButtonStyle} onClick={handleBackClick}>Back</button>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={headingStyle}>Add New Product</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          style={inputStyle}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
          style={textareaStyle}
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          placeholder="Industry Name"
          required
          style={inputStyle}
        />
        <input type="file" onChange={handleFileChange} required style={inputStyle} />
        <button type="submit" style={buttonStyle}>Add Product</button>
        {successMessage && <p style={successMessageStyle}>{successMessage}</p>}
      </form>
    </div>
  );
};

// Inline CSS Styles
const containerStyle = {
  backgroundImage: `url(${bg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
};

const formStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  width: '100%',
  maxWidth: '500px',
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const textareaStyle = {
  ...inputStyle,
  height: '100px',
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px'
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
  marginBottom: '20px'
};

const successMessageStyle = {
  color: 'green',
  textAlign: 'center',
  marginTop: '10px'
};

export default AddProduct;
