const express = require("express");
const router = express.Router();

const { getAllLogs, getAlllogsForDevice, getAllLatestDevicesLogs } = require("../Controllers/deviceLogController");

const requireAuth = require("../middleware/requireAuth");

//
router.use(requireAuth);

//Get all logs
router.get("/", getAllLogs);

//Get devices latest logs
router.get("/devices-latest", getAllLatestDevicesLogs);

//Get all logs for a device
router.get("/:id", getAlllogsForDevice);

module.exports = router;
