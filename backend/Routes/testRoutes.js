const express = require("express");

const router = express.Router();

const { createSession } = require("../Controllers/testController");

const requireAuth = require("../middleware/requireAuth");

//
router.use(requireAuth);

//Get Admins
router.post("/create", createSession);

module.exports = router;
