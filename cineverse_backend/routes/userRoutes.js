// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserDetails } = require('../controllers/userController');
const { authGuard, authGuardAdmin } = require('../middleware/authGuard');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


// Example of a protected route for admin users
router.get('/admin', authGuardAdmin, (req, res) => {
  res.json({ message: 'This is an admin protected route', user: req.user });
});
router.get('/profile', authGuard, getUserDetails);

module.exports = router;
