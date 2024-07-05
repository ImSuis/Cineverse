// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Example of a protected route for regular users
router.get('/profile', authGuard, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Example of a protected route for admin users
router.get('/admin', authGuardAdmin, (req, res) => {
  res.json({ message: 'This is an admin protected route', user: req.user });
});

module.exports = router;
