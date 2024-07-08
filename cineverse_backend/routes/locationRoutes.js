const express = require("express");
const locationController = require("../controllers/locationController");
const { authGuardAdmin } = require("../middleware/authGuard");

const router = express.Router();

// Route to create a location
router.post("/create", authGuardAdmin, locationController.createLocation);
router.get("/", authGuardAdmin, locationController.getAllLocations);
router.get("/:id",authGuardAdmin, locationController.getLocationById);
router.put("/:id", authGuardAdmin, locationController.updateLocationById);
router.delete("/:id", authGuardAdmin, locationController.deleteLocationById);

module.exports = router;
