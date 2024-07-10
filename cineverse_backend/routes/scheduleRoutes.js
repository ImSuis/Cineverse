const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");
const { authGuardAdmin } = require("../middleware/authGuard");

// Define routes
router.post("/create", authGuardAdmin, scheduleController.createSchedule);
router.get("/", authGuardAdmin, scheduleController.getAllSchedules);
router.get("/movie/:movieId", scheduleController.getAllSchedulesByMovie);
router.put("/:id", authGuardAdmin, scheduleController.updateScheduleById);
router.delete("/:id", authGuardAdmin, scheduleController.deleteScheduleById);

module.exports = router;