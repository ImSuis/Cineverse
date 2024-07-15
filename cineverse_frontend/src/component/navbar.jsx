import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaBars, FaCaretDown, FaUserCircle, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { logoutUser } from '../api/Api';
import SearchModal from './searchModal';
import '../style/navbar.css';

const Navbar = ({ handleLoginModalShow, handleRegisterModalShow, isLoggedIn, user }) => {
  const [activeLink, setActiveLink] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchModalShow, setSearchModalShow] = useState(false);
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

  const navigateToProfile = () => {
    navigate('/profile');
    setDropdownOpen(false);
  };

  const navigateToAdmin = () => {
    navigate('/admin');
    setDropdownOpen(false);
  };

  const handleSearchSubmit = (query) => {
    setSearchModalShow(false);
    navigate(`/search?query=${query}`);
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
            </div>
          </Col>
          <Col className="login-register-col">
            <div className="login-register">
              <FaSearch className="search-icon" size={20} onClick={() => setSearchModalShow(true)} />
              {isLoggedIn ? (
                <div className="profile-menu">
                  <div className="profile-icon" onClick={toggleDropdown}>
                    <FaUserCircle size={30} />
                    <span className="user-name">{user?.name}</span>
                    <FaCaretDown />
                  </div>
                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      <button onClick={navigateToProfile}>Profile</button>
                      {user?.isAdmin && (
                        <button onClick={navigateToAdmin}>Admin</button>
                      )}
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="login-link" onClick={handleLoginModalShow}>Login</button>
                  <button className="register-link" onClick={handleRegisterModalShow}>Register</button>
                </>
              )}
            </div>
            <button className="hamburger-menu" onClick={toggleMenu}>
              <FaBars />
            </button>
          </Col>
        </Row>
      </Container>
      <SearchModal show={searchModalShow} onHide={() => setSearchModalShow(false)} onSubmit={handleSearchSubmit} />
    </div>
  );
};

export default Navbar;
