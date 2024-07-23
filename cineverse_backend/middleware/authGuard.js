const jwt = require("jsonwebtoken");
require("dotenv").config();

const authGuard = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header not found",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decodedUser;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please log in again.",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

const authGuardAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: "Authorization header not found",
    });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Token not found",
    });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decodedUser;

    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Permission denied. Admin access required.",
      });
    }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please log in again.",
      });
    }
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = { authGuard, authGuardAdmin };
