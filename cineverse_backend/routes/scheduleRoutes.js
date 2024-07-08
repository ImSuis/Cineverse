const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");
const { authGuardAdmin } = require("../middleware/authGuard");

// Define routes
router.post("/create", authGuardAdmin, scheduleController.createSchedule);

module.exports = router;