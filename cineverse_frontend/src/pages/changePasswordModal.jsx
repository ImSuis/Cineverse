// src/components/ChangePasswordModal.js
import React, { useState } from 'react';
import { Button, Form, Modal, CloseButton } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../style/changePasswordModal.css'; // Import the CSS file

const ChangePasswordModal = ({ show, handleClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
          toast.error('New passwords do not match.');
          return;
        }
    
        try {
          const token = localStorage.getItem('token');
          await axios.put('http://localhost:5001/api/users/change-password', {
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
            toast.error(error.response.data.message); // Display specific error message from backend
          } else {
            toast.error('Password change failed. Please try again.'); // Fallback generic message
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
                            />
                        </Form.Group>
                        <Form.Group controlId="formConfirmNewPassword">
                            <Form.Label>Re-enter New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Re-enter your new password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </Form.Group>
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
