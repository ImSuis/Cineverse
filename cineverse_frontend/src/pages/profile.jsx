import React, { useEffect, useState } from 'react';
import '../style/profile.css';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage or context
        const response = await axios.get('http://localhost:5001/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}` // Add the authorization header
          }
        });
        setUser({
          name: response.data.user.name,
          email: response.data.user.email,
          mobile: '' // Assuming you don't have this in the response
        });
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., save changes)
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <button className="profile-sidebar-button active">Account Details</button>
        <button className="profile-sidebar-button">Ticket</button>
      </div>
      <div className="profile-content">
        {error && <div className="error-message">{error}</div>}
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className="profile-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="profile-form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="profile-form-buttons">
            <button type="button" className="profile-btn profile-change-password">Change Password</button>
            <button type="submit" className="profile-btn profile-save-changes">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
