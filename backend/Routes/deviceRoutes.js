const express = require("express");
const router = express.Router();
const { getAllDevices, getDevice, createDevice } = require("../Controllers/deviceController");

//Get all devices
router.get("/", getAllDevices);

//Get all devices
router.get("/:id", getDevice);

//Create new device
router.post("/add-device", createDevice);

module.exports = router;
