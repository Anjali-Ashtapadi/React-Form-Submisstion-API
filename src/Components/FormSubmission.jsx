import React, { useState } from 'react';
import axios from 'axios';
import '../assets/FormSubmission.css';

function FormSubmission() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!userData.name || !userData.email || !userData.address) {
      setError('All fields are required');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // AXIOS POST REQUEST
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        userData
      );

      console.log('Submitted data:', response.data);

      setIsSubmitted(true); // hide form after success
    } catch (err) {
      console.error('Submission error:', err);
      setError('Submission failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setUserData({ name: '', email: '', address: '' });
    setIsSubmitted(false);
    setError('');
  };

  return (
    <div className="container">
      <h3>Axios Form Submission</h3>

      {!isSubmitted && (
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={userData.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={userData.email}
            onChange={handleChange}
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            value={userData.address}
            onChange={handleChange}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}

      {isSubmitted && (
        <div className="success-box">
          <h3>✅ Form submitted successfully!</h3>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Address:</strong> {userData.address}</p>

          <button onClick={resetForm}>Submit Another Response</button>
        </div>
      )}
    </div>
  );
}

export default FormSubmission;
