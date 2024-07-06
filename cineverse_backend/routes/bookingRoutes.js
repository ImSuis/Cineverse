// routes/booking.js
const express = require("express");
const bookingController = require("../controllers/bookingController");
const { authGuard } = require("../middleware/authGuard");

const router = express.Router();

// Route to create a booking
router.post("/create", authGuard, bookingController.createBooking);

// Route to get bookings by user
router.get("/user", authGuard, bookingController.getBookingsByUser);

module.exports = router;
