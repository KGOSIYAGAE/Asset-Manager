const express = require("express");
const { getAllDevices, getDevice, addDevice, updateDevice, deleteDevice } = require("../Controllers/devices.controller");
const router = express.Router();

//Get All devices
router.get("/", getAllDevices);

//Get devices
router.get("/:serial_no", getDevice);

//Add devices
router.post("/add-device/", addDevice);

//Update devices
router.put("/edit-device/:serial_no", updateDevice);

//Update devices
router.delete("/delete-device/:id", deleteDevice);

module.exports = router;
