import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../style/profile.css';

function UserProfile({ user, setUser }) {
  const [localUser, setLocalUser] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLocalUser({
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone
        });
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching user details');
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5001/api/users/update', {
        name: localUser.name,
        phone: localUser.phone
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser({
        ...user,
        name: localUser.name,
        phone: localUser.phone
      });
      toast.success(response.data.message);
      setError('');
    } catch (err) {
      const errorMessage = err.response ? err.response.data.message : 'Error updating user details';
      toast.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={localUser.name}
            onChange={handleChange}
          />
        </div>
        <div className="profile-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={localUser.email}
            readOnly
          />
        </div>
        <div className="profile-form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="phone"
            value={localUser.phone}
            onChange={handleChange}
          />
        </div>
        <div className="profile-form-buttons">
          <button type="button" className="profile-btn profile-change-password">Change Password</button>
          <button type="submit" className="profile-btn profile-save-changes">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
