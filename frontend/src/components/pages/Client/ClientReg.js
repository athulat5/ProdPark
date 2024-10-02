import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../../../index.css'; // Add your own CSS file for styling

const ClientRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firmName: '',
    clientName: '',
    address: '',
    place: '',
    pin: '',
    phone: '',
    district: '',
    state: 'Kerala', // Default selected state
    gender: 'M', // Default selected gender
    industryId: '',
    password: '',
    confirmPassword: '',
    proof: null,
  });
  const [industries, setIndustries] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch industries from API
  useEffect(() => {
    async function fetchIndustries() {
      const response = await fetch('http://localhost:5000/api/industries');
      const data = await response.json();
      setIndustries(data);
    }
    fetchIndustries();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input for proof
    });
  };

  const validateForm = () => {
    const { pin, phone, password, confirmPassword } = formData;
    if (Object.values(formData).some(field => field === '')) {
      setError('Please fill in all fields');
      return false;
    }
    if (pin.length !== 6) {
      setError('Pin code should be exactly 6 digits');
      return false;
    }
    if (phone.length < 10) {
      setError('Phone number should be at least 10 digits');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataObj = new FormData();
    Object.keys(formData).forEach(key => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:5000/api/clients/register', {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        navigate('/success'); // Redirect on success
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to register');
      }
    } catch (error) {
      setError('Server error, please try again later.');
    }
  };

  return (
    <div className="client-registration">
      <h2>Client Application - ProdPark</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Firm Name</label>
          <input type="text" name="firmName" value={formData.firmName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Your Name</label>
          <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Place</label>
          <input type="text" name="place" value={formData.place} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Pin</label>
          <input type="text" name="pin" value={formData.pin} onChange={handleChange} maxLength="6" required />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} maxLength="13" required />
        </div>

        <div className="form-group">
          <label>District</label>
          <input type="text" name="district" value={formData.district} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>State</label>
          <select name="state" value={formData.state} onChange={handleChange} required>
            <option value="Kerala">Kerala</option>
            <option value="Tamilnadu">Tamilnadu</option>
            <option value="Karnataka">Karnataka</option>
            <option value="UP">UP</option>
            <option value="MP">MP</option>
            <option value="Gujarath">Gujarath</option>
            {/* Add other states as needed */}
          </select>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <input type="radio" name="gender" value="M" checked={formData.gender === 'M'} onChange={handleChange} /> Male
          <input type="radio" name="gender" value="F" checked={formData.gender === 'F'} onChange={handleChange} /> Female
        </div>

        <div className="form-group">
          <label>Upload Proof</label>
          <input type="file" name="proof" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Select Industry ID</label>
          <select name="industryId" value={formData.industryId} onChange={handleChange} required>
            <option value="">Select Industry</option>
            {industries.map(industry => (
              <option key={industry._id} value={industry._id}>{industry.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Retype Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="reset" onClick={() => setFormData({
            firmName: '', clientName: '', address: '', place: '', pin: '', phone: '', district: '', state: 'Kerala', gender: 'M', industryId: '', password: '', confirmPassword: '', proof: null,
          })}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default ClientRegistrationForm;
