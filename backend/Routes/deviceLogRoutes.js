const express = require("express");
const router = express.Router();

const { getAllLogs, getAlllogsForDevice } = require("../Controllers/deviceLogController");

//Get all logs
router.get("/", getAllLogs);

//Get all logs for a device
router.get("/:id", getAlllogsForDevice);

module.exports = router;
