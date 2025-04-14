const express = require("express");
const router = express.Router();
const { getAllDevices } = require("../Controllers/deviceController");

//Get all devices
router.get("/", getAllDevices);

module.exports = router;
