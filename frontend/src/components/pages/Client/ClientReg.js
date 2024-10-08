import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        address: '',
        userPhoto: null,
        idCardPhoto: null
    });

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

    return (
        <div>
            <h2>Client Registration</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleChange} required />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} required />
                </div>
                <div>
                    <label>Address:</label>
                    <textarea name="address" onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label>User Photo:</label>
                    <input type="file" name="userPhoto" onChange={handleChange} required />
                </div>
                <div>
                    <label>ID Card Photo:</label>
                    <input type="file" name="idCardPhoto" onChange={handleChange} required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default App;
