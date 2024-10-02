import React, { useState } from 'react';
import './StaffRegistrationForm.css'; // CSS file for styling

const StaffRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { email, phone, password, confirmPassword } = formData;
    if (Object.values(formData).some(field => field === '')) {
      setError('Please fill in all fields');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (phone.length < 10) {
      setError('Phone number should be at least 10 digits');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate a successful registration request
    console.log('Staff registered:', formData);
    alert('Staff registration successful!');
    // Here you can send the formData to your backend API

    // Reset the form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div className="staff-registration">
      <h2>Staff Registration</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Position</label>
          <input type="text" name="position" value={formData.position} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <div className="form-actions">
          <button type="submit">Register</button>
          <button type="reset" onClick={() => setFormData({
            fullName: '',
            email: '',
            phone: '',
            position: '',
            department: '',
            password: '',
            confirmPassword: '',
          })}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default StaffRegistrationForm;
