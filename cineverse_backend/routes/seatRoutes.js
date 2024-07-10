const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seatController");

// Define routes
router.get("/schedule/:scheduleId", seatController.getSeatbySchedule);

router.get('/booking/:scheduleId', seatController.getSeatsWithBookingStatus);

module.exports = router;