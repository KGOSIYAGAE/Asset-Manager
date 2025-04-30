const express = require("express");
const router = express.Router();
const { getAllDevices, getDevice, getDeviceDetails, createDevice, updateDevice, deleteDevice, bulkCreateDevice, assignDevice, releaseDevice } = require("../Controllers/deviceController");
const requireAuth = require("../middleware/requireAuth");

//
router.use(requireAuth);

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

//Update device
router.put("/assign-device/:id", assignDevice);

//Update device
router.put("/release-device/:id", releaseDevice);

//Delete device
router.delete("/delete-device/:id", deleteDevice);

module.exports = router;
