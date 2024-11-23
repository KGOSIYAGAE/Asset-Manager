const express = require("express");
const { getAllDevices, getDevice, addDevice } = require("../Controllers/devices.controller");
const router = express.Router();

//Get All devices
router.get("/", getAllDevices);

//Get devices
router.get("/:serial_no", getDevice);

//Add devices
router.post("/add-device/", addDevice);

module.exports = router;
