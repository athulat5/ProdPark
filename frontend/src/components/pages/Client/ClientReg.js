import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation
import bg from './../../images/home.jpg';

const App = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        address: '',
        userPhoto: null,
        idCardPhoto: null
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        try {
            const response = await axios.post('/api/client', data);
            alert(response.data.message);
        } catch (error) {
            alert('Error registering client');
        }
    };

    // Inline styles
    const containerStyle = {
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url(${bg})`, // Ensure the path is correct
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center the content horizontally
        justifyContent: 'flex-start', // Align items to the top
    };

    const backButtonStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: '#007bff',
        border: 'none',
        color: '#fff',
        padding: '10px 15px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        zIndex: 1,
    };

    const formContainerStyle = {
        position: 'relative',
        zIndex: 2,
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with some transparency
        borderRadius: '10px',
        maxWidth: '500px',
        margin: '80px auto 0', // Add top margin for spacing from the top
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        width: '90%', // Make the form responsive
    };

    const inputStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };

    const submitButtonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div style={containerStyle}>
            <button
                style={backButtonStyle}
                onClick={() => navigate('/AdminDashboard')}
            >
                Back
            </button>
            <div style={formContainerStyle}>
                <h2 style={{ textAlign: 'center' }}>Client Registration</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" style={inputStyle} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" style={inputStyle} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input type="password" name="confirmPassword" style={inputStyle} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Address:</label>
                        <textarea name="address" style={{ ...inputStyle, height: '80px' }} onChange={handleChange} required></textarea>
                    </div>
                    <div>
                        <label>User Photo:</label>
                        <input type="file" name="userPhoto" style={inputStyle} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>ID Card Photo:</label>
                        <input type="file" name="idCardPhoto" style={inputStyle} onChange={handleChange} required />
                    </div>
                    <button type="submit" style={submitButtonStyle}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default App;
