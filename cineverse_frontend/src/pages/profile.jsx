import React, { useState } from 'react';
import UserProfile from './userProfile';
import UserBookings from './userBookings';
import ProfileSidebar from './profileSidebar';
import '../style/profile.css';

function Profile({ user, setUser }) {
  const [activeTab, setActiveTab] = useState('account');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="profile-container">
      <ProfileSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="profile-content">
        {activeTab === 'account' ? (
          <UserProfile user={user} setUser={setUser} />
        ) : (
          <UserBookings />
        )}
      </div>
    </div>
  );
}

export default Profile;
