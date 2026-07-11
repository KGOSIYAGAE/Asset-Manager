const express = require("express");
const router = express.Router();
const { sendApprovalEmail } = require("../Controllers/notificationsController");

//onst requireAuth = require("../middleware/requireAuth");
//const checkRole = require("../middleware/checkRole");

//Create new device
router.post("/approval-email", sendApprovalEmail);

module.exports = router;
