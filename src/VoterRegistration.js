import './VoterRegistration.css';
import React, { useState } from 'react';

function VoterRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    email: '',
    phone: '',
    identityProof: null,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      identityProof: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parseInt(formData.age) < 18) {
      setError('Age must be 18 or above to register.');
      return;
    }

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:5000/api/voters', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Voter Registered Successfully!');
        setFormData({
          name: '',
          age: '',
          gender: '',
          address: '',
          email: '',
          phone: '',
          identityProof: null,
        });
      } else {
        setError(data.error || 'Registration failed!');
      }
    } catch (error) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="registration-form">
      <h2>Voter Registration Form</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="age">Age</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required min="18" />
        </div>

        <div>
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="identityProof">Upload Identity Proof (JPG, PNG, PDF)</label>
          <input type="file" id="identityProof" name="identityProof" onChange={handleFileChange} required />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default VoterRegistration;
