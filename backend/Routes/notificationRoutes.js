const express = require("express");
const router = express.Router();
const { sendApprovalEmail, sendFormViaEmail, testEmail } = require("../Controllers/notificationsController");

//onst requireAuth = require("../middleware/requireAuth");
//const checkRole = require("../middleware/checkRole");

//Create new device
router.post("/approval-email", sendApprovalEmail);

router.post("/form-email", sendFormViaEmail);

router.post("/test-email", testEmail);

module.exports = router;
