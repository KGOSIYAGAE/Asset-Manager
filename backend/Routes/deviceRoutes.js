const express = require("express");
const router = express.Router();
const { getAllDevices, getDevice, getDeviceDetails, createDevice, updateDevice, deleteDevice, bulkCreateDevice } = require("../Controllers/deviceController");

//Get all devices
router.get("/", getAllDevices);

//Get all devices
router.get("/:id", getDevice);

//Get all devices details
router.get("/device-details/:id", getDeviceDetails);

//Create new device
router.post("/add-device", createDevice);

//bilk create devices
router.post("/bulk-add-devices", bulkCreateDevice);

//Update device
router.put("/update-device/:id", updateDevice);

//Delete device
router.delete("/delete-device/:id", deleteDevice);

module.exports = router;
