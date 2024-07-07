const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { authGuard } = require("../middleware/authGuard"); // Import authGuard middleware

// Define routes
router.post("/create", authGuard, bookingController.createBooking);

module.exports = router;
