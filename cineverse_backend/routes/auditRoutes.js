const express = require("express");
const router = express.Router();
const auditController = require("../controllers/auditController");
const { authGuardAdmin } = require("../middleware/authGuard");

// Define routes
router.get("/", authGuardAdmin, auditController.getAuditLogs);

module.exports = router;