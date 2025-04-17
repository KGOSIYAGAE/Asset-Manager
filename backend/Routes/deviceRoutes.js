const express = require("express");
const router = express.Router();
const { getAllDevices, getDevice, createDevice, deleteDevice } = require("../Controllers/deviceController");

//Get all devices
router.get("/", getAllDevices);

//Get all devices
router.get("/:id", getDevice);

//Create new device
router.post("/add-device", createDevice);

//Delete device
router.delete("/delete-device/:id", deleteDevice);

module.exports = router;
