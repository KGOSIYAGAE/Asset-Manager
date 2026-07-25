const express = require("express");
const router = express.Router();

const { getAllLogs, getAllTransactionsForDevice, getAllLatestDevicesTransactions, getAllTransactionsForUser } = require("../Controllers/deviceTransactionsController");

const requireAuth = require("../middleware/requireAuth");

//
router.use(requireAuth);

//Get all logs
//router.get("/", getAllLogs);

//Get devices latest logs
router.get("/devices-latest", getAllLatestDevicesTransactions);

//Get all logs for a device
router.get("/transactions", getAllTransactionsForDevice);

//Get all logs for a device
router.get("/user-transactions", getAllTransactionsForUser);

module.exports = router;
