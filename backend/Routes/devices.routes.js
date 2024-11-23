const express = require("express");
const { getAllDevices, getDevice, addDevice, updateDevice } = require("../Controllers/devices.controller");
const router = express.Router();

//Get All devices
router.get("/", getAllDevices);

//Get devices
router.get("/:serial_no", getDevice);

//Add devices
router.post("/add-device/", addDevice);

//Update devices
router.put("/edit-device/", updateDevice);

module.exports = router;
