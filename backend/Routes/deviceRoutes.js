const express = require("express");
const router = express.Router();
const { getAllDevices, getDevice } = require("../Controllers/deviceController");

//Get all devices
router.get("/", getAllDevices);

//Get all devices
router.get("/:id", getDevice);

module.exports = router;
