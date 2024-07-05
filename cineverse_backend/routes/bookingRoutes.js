// routes/booking.js
const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

// Route to create a booking
router.post("/create", bookingController.createBooking);

// Route to get bookings by user
router.get("/user/:userId", bookingController.getBookingsByUser);

module.exports = router;
