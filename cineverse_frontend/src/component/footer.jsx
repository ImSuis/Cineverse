import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../style/footer.css'; // Custom CSS for the footer

const Footer = () => {
    // Example function for handling link click (adjust as per your routing needs)
    const handleLinkClick = (route) => {
        // Implement your routing logic here
        console.log(`Navigating to: ${route}`);
    };

    return (
        <div className="footer">
            <Col className="logo-col">
                <Link to="/" className="logo-text-link" onClick={() => handleLinkClick('home')}>
                    <span className="logo-text">Cine<span className="logo-verse">verse</span></span>
                </Link>
            </Col>
            
        </div>
    );
};

export default Footer;
