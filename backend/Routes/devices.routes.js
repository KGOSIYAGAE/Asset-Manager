const express = require("express");
const { getAllDevices } = require("../Controllers/devices.controller");
const router = express.Router();

router.get("/", getAllDevices);

module.exports = router;
