import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaBars, FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { logoutUser } from '../api/Api'; // Import the logout function
import '../style/navbar.css';

const Navbar = ({ handleLoginModalShow, handleRegisterModalShow, isLoggedIn, user }) => {
    const [activeLink, setActiveLink] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setMenuOpen(false); // Close menu on link click
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen); // Toggle dropdown menu
    };

    const handleLogout = () => {
        logoutUser(); // Call the logout function
        window.location.reload(); // Refresh the page to update the state
    };

    return (
        <div className="navbar-container">
            <Container>
                <Row className="align-items-center">
                    <Col className="logo-col">
                        <span className="logo-text">Cine<span className="logo-verse">verse</span></span>
                    </Col>
                    <Col className="navigation-col">
                        <div className={`navigation ${menuOpen ? 'open' : ''}`}>
                            <a href="#home" className={activeLink === 'home' ? 'active' : ''} onClick={() => handleLinkClick('home')}>Home</a>
                            <a href="#now-showing" className={activeLink === 'now-showing' ? 'active' : ''} onClick={() => handleLinkClick('now-showing')}>Now Showing</a>
                            <a href="#coming-soon" className={activeLink === 'coming-soon' ? 'active' : ''} onClick={() => handleLinkClick('coming-soon')}>Coming Soon</a>
                            <a href="#contact-us" className={activeLink === 'contact-us' ? 'active' : ''} onClick={() => handleLinkClick('contact-us')}>Contact Us</a>
                        </div>
                    </Col>
                    <Col className="login-register-col">
                        <div className="login-register">
                            {isLoggedIn ? (
                                <div className="profile-menu">
                                    <div className="profile-icon" onClick={toggleDropdown}>
                                        <FaUserCircle size={30} />
                                        <span className="user-name">{user?.name}</span>
                                        <FaCaretDown />
                                    </div>
                                    {dropdownOpen && (
                                        <div className="dropdown-menu">
                                            <button onClick={handleLogout}>Logout</button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <a href="#login" className="login-link" onClick={handleLoginModalShow}>Login</a>
                                    <a href="#register" className="register-link" onClick={handleRegisterModalShow}>Register</a>
                                </>
                            )}
                        </div>
                        <button className="hamburger-menu" onClick={toggleMenu}>
                            <FaBars />
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Navbar;
