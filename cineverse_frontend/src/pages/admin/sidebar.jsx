// src/components/Sidebar.js

import React from 'react';
import { FaFilm, FaLocationArrow, FaTachometerAlt, FaTicketAlt } from 'react-icons/fa'; // Example icons
import { Link } from 'react-router-dom';
import '../admin/style/sidebar.css';

const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLinkClick = (section) => {
        //console.log(`Navigating to ${section}`);
    };

    return (
        <div className="sidebar">
            <div>
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
                        <Link to="/admin/movies">
                            <FaFilm className="sidebar-icon" />
                            Manage Movies
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/locations">
                            <FaLocationArrow className="sidebar-icon" />
                            Manage Locations
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/showtimes">
                            <FaTicketAlt className="sidebar-icon" />
                            Manage Showtimes
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/schedules">
                            <FaTicketAlt className="sidebar-icon" />
                            Manage schedule
                        </Link>
                    </li>
                    {/* Add more links as needed */}
                </ul>
            </div>
            {user && (
                <div className="user-section">
                    <hr />
                    <span>{user.name}</span> {/* Display the user's name */}
                </div>
            )}
        </div>
    );
};

export default Sidebar;
