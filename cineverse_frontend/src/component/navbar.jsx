import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaBars, FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll'; // Import ScrollLink
import { logoutUser } from '../api/Api';
import '../style/navbar.css';

const Navbar = ({ handleLoginModalShow, handleRegisterModalShow, isLoggedIn, user }) => {
    const [activeLink, setActiveLink] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setMenuOpen(false);
        if (link === 'home') {
            navigate('/');
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        logoutUser();
        window.location.reload();
    };

    return (
        <div className="navbar-container">
            <Container>
                <Row className="align-items-center">
                    <Col className="logo-col">
                        <Link to="/" className="logo-text-link" onClick={() => handleLinkClick('home')}>
                            <span className="logo-text">Cine<span className="logo-verse">verse</span></span>
                        </Link>
                    </Col>
                    <Col className="navigation-col">
                        <div className={`navigation ${menuOpen ? 'open' : ''}`}>
                            <Link to="/" className={activeLink === 'home' ? 'active' : ''} onClick={() => handleLinkClick('home')}>Home</Link>
                            <ScrollLink to="now-showing" smooth={true} duration={500} className={activeLink === 'now-showing' ? 'active' : ''} onClick={() => handleLinkClick('now-showing')}>Now Showing</ScrollLink>
                            <ScrollLink to="coming-soon" smooth={true} duration={500} className={activeLink === 'coming-soon' ? 'active' : ''} onClick={() => handleLinkClick('coming-soon')}>Coming Soon</ScrollLink>
                            <Link to="#contact-us" className={activeLink === 'contact-us' ? 'active' : ''} onClick={() => handleLinkClick('contact-us')}>Contact Us</Link>
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
                                    <button  className="login-link" onClick={handleLoginModalShow}>Login</button>
                                    <button href="#register" className="register-link" onClick={handleRegisterModalShow}>Register</button>
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
