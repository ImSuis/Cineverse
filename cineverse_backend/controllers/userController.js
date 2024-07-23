const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel"); // Correct import path
require("dotenv").config();
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  handler: (req, res) => {
    res.status(429).json({ message: 'Too many login attempts, please try again after a minute' });
  },
});


const passwordPolicy = (password) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must include at least one uppercase letter.';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must include at least one lowercase letter.';
  }
  if (!/\d/.test(password)) {
    return 'Password must include at least one number.';
  }
  if (!/[@$!%*?&]/.test(password)) {
    return 'Password must include at least one special character.';
  }
  return null; // Password meets all requirements
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const passwordError = passwordPolicy(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      previousPasswords: [], // Initialize as an empty array
    });
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

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin }, // Include isAdmin in the token
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: '2h',
      }
    );

    // Include user details in the response
    const userDetails = {
      id: user.id,
      email: user.email,
      name: user.name, // Include other user details as needed
      isAdmin: user.isAdmin, // Include isAdmin in the response
    };

    res.status(200).json({ message: 'Login successful', token, user: userDetails });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "phone"], // Select fields to include in the response
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const passwordError = passwordPolicy(newPassword);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    // Check if the new password is in the previous passwords array
    const isPreviousPassword = await Promise.all(user.previousPasswords.map(async (prevPassword) => {
      return await bcrypt.compare(newPassword, prevPassword);
    }));

    if (isPreviousPassword.some(result => result)) {
      return res.status(400).json({ message: "New password cannot be one of the previous passwords" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's previous passwords array
    const previousPasswords = user.previousPasswords || [];
    previousPasswords.push(user.password); // Add the current password to the previous passwords array
    if (previousPasswords.length > 5) {
      previousPasswords.shift(); // Keep only the last 5 passwords
    }
    user.previousPasswords = previousPasswords;

    // Explicitly mark the previousPasswords field as changed
    user.setDataValue('previousPasswords', previousPasswords);
    user.changed('previousPasswords', true);

    // console.log('Updated previousPasswords:', user.previousPasswords); 

    user.password = hashedNewPassword;

    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    // console.error(error); // Log for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const generateRandomCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

// Send code to user's email
const sendCodeToEmail = async (email, code) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Password Reset Code",
    text: `Your verification code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};

const requestCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const code = generateRandomCode();
    user.resetCode = code;
    await user.save();

    await sendCodeToEmail(email, code);

    res.status(200).json({
      success: true,
      message: "Verification code sent to your email.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (code !== user.resetCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Verification code is correct.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const verifyCodeAndChangePassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (code !== user.resetCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code.",
      });
    }

    const passwordError = passwordPolicy(newPassword);
    if (passwordError) {
      return res.status(400).json({ success: false, message: passwordError });
    }

    // Check if the new password matches any of the previous passwords
    const isPreviousPassword = await Promise.all(user.previousPasswords.map(async (prevPassword) => {
      return await bcrypt.compare(newPassword, prevPassword);
    }));

    if (isPreviousPassword.some(result => result)) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be one of the previous passwords.",
      });
    }

    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPassword, randomSalt);

    // Update the previous passwords array
    user.previousPasswords.push(user.password); // Add the current password to the previous passwords array
    if (user.previousPasswords.length > 5) {
      user.previousPasswords.shift(); // Keep only the last 5 passwords
    }

    user.password = encryptedPassword;
    user.resetCode = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  updateUser,
  changePassword,
  generateRandomCode,
  sendCodeToEmail,
  requestCode,
  verifyCodeAndChangePassword,
  verifyCode,
  limiter,
};
