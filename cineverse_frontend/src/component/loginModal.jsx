import React, { useState } from 'react';
import { Button, Form, Modal, CloseButton } from 'react-bootstrap';
import { loginUserApi } from '../api/Api'; // Import your API function
import { toast } from 'react-toastify';
import ForgetPasswordModal from '../pages/forgotPasswordModal'; // Import the ForgetPasswordModal component
import '../style/loginModal.css'; // Import the CSS file

const LoginModal = ({ show, handleClose, setIsLoggedIn, setUser, handleShowForgetPassword }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await loginUserApi({ email, password });
            const { user } = response.data;
            setUser(user); // Set user state
            setIsLoggedIn(true); // Set isLoggedIn state
            toast.success('Login Successful!');
            handleClose(); // Close modal after successful login
        } catch (error) {
            toast.error('Login Failed. Please try again.');
            console.error('Login Error:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Login</h5>
                    <CloseButton onClick={handleClose} className="close-btn" />
                </div>
                <div className="modal-body">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="forgot-password" onClick={handleShowForgetPassword}>
                            Forgot password?
                        </div>
                    </Form>
                </div>
                <div className="modal-footer">
                    <Button className="btn-orange" onClick={handleLogin}>
                        Login
                    </Button>
                    <div className="signup-text">
                        Don't have an account? <a href="#register">Sign up</a>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;