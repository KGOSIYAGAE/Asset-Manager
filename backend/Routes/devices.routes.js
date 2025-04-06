const express = require("express");
const { getAllDevices, getDevice, addDevice, bulkAddDevice, updateDevice, assignDevice, deleteDevice } = require("../Controllers/devices.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//Protect routes from unauthorised use
router.use(requireAuth);

//Get All devices
router.get("/", getAllDevices);

//Get devices
router.get("/:id", getDevice);

//Add device
router.post("/add-device/", addDevice);

//Bulk Add devices
router.post("/add-devices/", bulkAddDevice);

//Update devices
router.put("/edit-device/:id", updateDevice);

//Assign device
router.put("/assign-device/:id", assignDevice);

//Update devices
router.delete("/delete-device/:id", deleteDevice);

module.exports = router;
