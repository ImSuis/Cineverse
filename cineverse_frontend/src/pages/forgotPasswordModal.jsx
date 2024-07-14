import React, { useState } from 'react';
import { Button, Form, Modal, CloseButton } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../style/loginModal.css'; // Import the CSS file

const ForgetPasswordModal = ({ show, handleClose }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailSubmit = () => {
        // Send request to backend to send code to email
        // Example API call
        // sendCodeToEmail(email)
        //     .then(response => {
        //         toast.success('Verification code sent to your email.');
        //         setStep(2);
        //     })
        //     .catch(error => {
        //         toast.error('Failed to send verification code.');
        //     });
        setStep(2); // For demonstration purposes
    };

    const handleCodeSubmit = () => {
        // Verify code
        // Example API call
        // verifyCode(email, code)
        //     .then(response => {
        //         toast.success('Code verified.');
        //         setStep(3);
        //     })
        //     .catch(error => {
        //         toast.error('Invalid verification code.');
        //     });
        setStep(3); // For demonstration purposes
    };

    const handlePasswordSubmit = () => {
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        // Change password
        // Example API call
        // changePassword(email, code, newPassword)
        //     .then(response => {
        //         toast.success('Password changed successfully.');
        //         handleClose();
        //     })
        //     .catch(error => {
        //         toast.error('Failed to change password.');
        //     });
        handleClose(); // For demonstration purposes
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Reset Password</h5>
                    <CloseButton onClick={handleClose} className="close-btn" />
                </div>
                <div className="modal-body">
                    {step === 1 && (
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Please enter your registered email address to reset the password</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    )}
                    {step === 2 && (
                        <Form>
                            <Form.Group controlId="formBasicCode">
                                <Form.Label>Please enter the 6 digit OTP sent to your email address</Form.Label>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    {Array.from({ length: 6 }).map((_, index) => (
                                        <Form.Control
                                            key={index}
                                            type="text"
                                            maxLength="1"
                                            value={code[index] || ''}
                                            onChange={(e) => {
                                                const newCode = code.split('');
                                                newCode[index] = e.target.value;
                                                setCode(newCode.join(''));
                                            }}
                                            style={{ width: '2rem', textAlign: 'center' }}
                                        />
                                    ))}
                                </div>
                            </Form.Group>
                        </Form>
                    )}
                    {step === 3 && (
                        <Form>
                            <Form.Group controlId="formNewPassword">
                                <Form.Label>Enter new password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword">
                                <Form.Label>Re-enter new password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Re-enter new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </div>
                <div className="modal-footer">
                    {step === 1 && (
                        <Button className="btn-orange" onClick={handleEmailSubmit}>
                            Continue
                        </Button>
                    )}
                    {step === 2 && (
                        <Button className="btn-orange" onClick={handleCodeSubmit}>
                            Continue
                        </Button>
                    )}
                    {step === 3 && (
                        <Button className="btn-orange" onClick={handlePasswordSubmit}>
                            Continue
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ForgetPasswordModal;
