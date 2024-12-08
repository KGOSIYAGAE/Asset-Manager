const express = require("express");
const { getAllDevices, getDevice, addDevice, updateDevice, assignDevice, deleteDevice } = require("../Controllers/devices.controller");
const router = express.Router();

//Get All devices
router.get("/", getAllDevices);

//Get devices
router.get("/:id", getDevice);

//Add devices
router.post("/add-device/", addDevice);

//Update devices
router.put("/edit-device/:id", updateDevice);

//Assign device
router.put("/assign-device/:id", assignDevice);

//Update devices
router.delete("/delete-device/:id", deleteDevice);

module.exports = router;
