import React, { useState } from 'react';
import { Button, Form, Modal, CloseButton } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../style/changePasswordModal.css';
import PasswordStrengthBar from 'react-password-strength-bar';

const ChangePasswordModal = ({ show, handleClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setErrors({ ...errors, confirmNewPassword: 'New passwords do not match.' });
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put('https://localhost:5001/api/users/change-password', {
                currentPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Password changed successfully!');
            handleClose(); // Close modal after successful password change
        } catch (error) {
            if (error.response && error.response.data.message) {
                const errorMessage = error.response.data.message;

                // Check if the error message contains password policy issues
                if (errorMessage.includes("Password")) {
                    setErrors({ password: errorMessage });
                } else {
                    setErrors({ general: errorMessage });
                }
            } else {
                setErrors({ general: 'Password change failed. Please try again.' });
            }
            console.error('Password Change Error:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="change-password-modal-content">
                <div className="change-password-modal-header">
                    <h5 className="change-password-modal-title">Change Password</h5>
                    <CloseButton onClick={handleClose} className="change-password-close-btn" />
                </div>
                <div className="change-password-modal-body">
                    <Form>
                        <Form.Group controlId="formCurrentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your current password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            <PasswordStrengthBar password={newPassword} />
                        </Form.Group>
                        <Form.Group controlId="formConfirmNewPassword">
                            <Form.Label>Re-enter New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Re-enter your new password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                isInvalid={!!errors.confirmNewPassword}
                            />
                            <Form.Control.Feedback type="invalid">{errors.confirmNewPassword}</Form.Control.Feedback>
                        </Form.Group>
                        {errors.general && <div className="text-danger">{errors.general}</div>}
                    </Form>
                </div>
                <div className="change-password-modal-footer">
                    <Button className="change-password-btn-orange" onClick={handleChangePassword}>
                        Change Password
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ChangePasswordModal;
