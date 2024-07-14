import React, { useState } from 'react';
import LoginModal from '../component/loginModal';
import ForgetPasswordModal from './forgotPasswordModal';

const AuthModalManager = ({ show, handleClose, setIsLoggedIn, setUser }) => {
    const [showForgetPassword, setShowForgetPassword] = useState(false);

    const handleShowForgetPassword = () => {
        setShowForgetPassword(true);
    };

    const handleCloseForgetPassword = () => {
        setShowForgetPassword(false);
    };

    return (
        <>
            <LoginModal
                show={show && !showForgetPassword}
                handleClose={handleClose}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
                handleShowForgetPassword={handleShowForgetPassword}
            />
            <ForgetPasswordModal
                show={show && showForgetPassword}
                handleClose={() => {
                    handleCloseForgetPassword();
                    handleClose();
                }}
            />
        </>
    );
};

export default AuthModalManager;
