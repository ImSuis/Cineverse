import React from 'react';
import '../style/profile.css';

function ProfileSidebar({ activeTab, onTabChange }) {
  return (
    <div className="profile-sidebar">
      <button
        className={`profile-sidebar-button ${activeTab === 'account' ? 'active' : ''}`}
        onClick={() => onTabChange('account')}
      >
        Account Details
      </button>
      <button
        className={`profile-sidebar-button ${activeTab === 'tickets' ? 'active' : ''}`}
        onClick={() => onTabChange('tickets')}
      >
        Ticket
      </button>
    </div>
  );
}

export default ProfileSidebar;
