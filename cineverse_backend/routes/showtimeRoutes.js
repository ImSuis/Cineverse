const express = require("express");
const showtimeController = require("../controllers/showtimeController");
const { authGuardAdmin } = require("../middleware/authGuard");

const router = express.Router();

// Route to create a showtime
router.post("/create", authGuardAdmin, showtimeController.createShowtime);
router.get("/", authGuardAdmin, showtimeController.getAllShowtimes);
router.get("/:id",authGuardAdmin, showtimeController.getShowtimeById);
router.put("/:id", authGuardAdmin, showtimeController.updateShowtimeById);
router.delete("/:id", authGuardAdmin, showtimeController.deleteShowtimeById);

module.exports = router;