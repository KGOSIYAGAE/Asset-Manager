const express = require("express");
const { getAllDevices, getDevice } = require("../Controllers/devices.controller");
const router = express.Router();

//Get All devices
router.get("/", getAllDevices);

//Get devices
router.get("/:serial_no", getDevice);

module.exports = router;
