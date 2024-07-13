import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; // Import icons from react-icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../style/footer.css'; // Custom CSS for the footer

const Footer = () => {
    return (
        <div className="footer">
            <div className="logo-col">
                <Link to="/" className="logo-text-link">
                    <span className="logo-text">Cine<span className="logo-verse">verse</span></span>
                </Link>
                <Link to="/faq">
                    <span className="faq">FAQs</span>
                </Link>
            </div>
            <div className="social-col">
                <span className="follow-text">Follow us on</span>
                <div className="social-icons">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
