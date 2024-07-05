// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel'); // Correct import path
require('dotenv').config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: '1h',
    });

    // Include user details in the response
    const userDetails = {
      id: user.id,
      email: user.email,
      name: user.name, // Include other user details as needed
    };

    res.status(200).json({ message: 'Login successful', token, user: userDetails });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { registerUser, loginUser };
