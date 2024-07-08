// src/pages/admin/AdminDashboard.js

import React from 'react';
import Sidebar from './sidebar';
import './style/adminDashboard.css'; // Assuming you will add some CSS for layout

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="admin-content">
                <h1>Welcome to the Admin Dashboard!</h1>
                {/* Add your content here */}
            </div>
        </div>
    );
};

export default AdminDashboard;
