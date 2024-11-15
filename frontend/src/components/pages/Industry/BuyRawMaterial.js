// BuyRawMaterial.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom v6

const BuyRawMaterial = () => {
  const [rawMaterials, setRawMaterials] = useState([]); // State to store raw materials
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch raw materials from the backend
  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await axios.get('/api/raw-materials'); // Make API call to get raw materials
        setRawMaterials(response.data); // Set raw materials to state
      } catch (err) {
        console.error('Error fetching raw materials:', err); // Handle any errors
      }
    };
    fetchRawMaterials(); // Call the function to fetch raw materials
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Handle the "Buy Now" button click
  const handleBuy = (materialId) => {
    navigate(`/buy/${materialId}`); // Navigate to the product details page
  };

  return (
    <div>
      <h1>Buy Raw Materials</h1>
      <div className="raw-materials-list">
        {rawMaterials.map((material) => (
          <div key={material._id} className="raw-material-item">
            <h2>{material.name}</h2> {/* Display the material name */}
            <p>{material.description}</p> {/* Display the material description */}
            <p>Price: ₹{material.price}</p> {/* Display the price */}
            <p>Available Quantity: {material.quantity}</p> {/* Display available quantity */}
            <button onClick={() => handleBuy(material._id)}>Buy Now</button> {/* Handle the "Buy Now" click */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyRawMaterial;
