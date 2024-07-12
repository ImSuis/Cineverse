import React from 'react';
import '../style/profile.css';

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <button className="profile-sidebar-button active">Account Details</button>
        <button className="profile-sidebar-button">Ticket</button>
      </div>
      <div className="profile-content">
        <form className="profile-form">
          <div className="profile-form-group">
            <label>Full Name</label>
            <input type="text" value="Test User" />
          </div>
          <div className="profile-form-group">
            <label>Email</label>
            <input type="email" value="test@email.com" />
          </div>
          <div className="profile-form-group">
            <label>Mobile Number</label>
            <input type="text" value="" />
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
