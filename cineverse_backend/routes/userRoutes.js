// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserDetails, updateUser, changePassword, sendCodeToEmail, requestCode, verifyCodeAndChangePassword, verifyCode, limiter } = require('../controllers/userController');
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login',limiter, loginUser);
router.put('/update', authGuard, updateUser);
router.put('/change-password', authGuard, changePassword);
router.post('/send-code', sendCodeToEmail);
router.post("/verify-code", verifyCode);
router.post("/request-code", requestCode);

router.post(
  "/verify-code-and-change-password", verifyCodeAndChangePassword
); 

// Example of a protected route for admin users
router.get('/admin', authGuardAdmin, (req, res) => {
  res.json({ message: 'This is an admin protected route', user: req.user });
});
router.get('/profile', authGuard, getUserDetails);

module.exports = router;
