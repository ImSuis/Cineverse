// src/components/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaFilm, FaTicketAlt } from 'react-icons/fa'; // Example icons
import '../admin/style/sidebar.css';

const Sidebar = () => {
    const handleLinkClick = (section) => {
        console.log(`Navigating to ${section}`);
    };

    return (
        <div className="sidebar">
            <div className="logo-col">
                <Link to="/" className="logo-text-link" onClick={() => handleLinkClick('home')}>
                    <span className="logo-text">Cine<span className="logo-verse">verse</span></span>
                </Link>
            </div>
            <ul>
                <li>
                    <Link to="/admin">
                        <FaTachometerAlt className="sidebar-icon" />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/admin/users">
                        <FaUsers className="sidebar-icon" />
                        Manage Users
                    </Link>
                </li>
                <li>
                    <Link to="/admin/movies">
                        <FaFilm className="sidebar-icon" />
                        Manage Movies
                    </Link>
                </li>
                <li>
                    <Link to="/admin/bookings">
                        <FaTicketAlt className="sidebar-icon" />
                        Manage Bookings
                    </Link>
                </li>
                {/* Add more links as needed */}
            </ul>
        </div>
    );
};

export default Sidebar;
