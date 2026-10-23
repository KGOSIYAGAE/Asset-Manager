const express = require("express");
const router = express.Router();
const {
  getAllDevices,
  getDeviceDueUpgrade,
  getDeviceForApproval,
  getLoanedDevices,
  getDevicesDueReturn,
  getDevicesStats,
  getDevice,
  getDeviceDetails,
  getDevicesAssigned,
  createDevice,
  updateDevice,
  deleteDevice,
  bulkCreateDevice,
  assignDevice,
  loanDevice,
  releaseDevice,
  rejectDeviceIssueLoan,
  approveDevice,
} = require("../Controllers/deviceController");
const requireAuth = require("../middleware/requireAuth");
//const checkRole = require("../middleware/checkRole");

//
router.use(requireAuth);

//Get all devices
router.get("/", getAllDevices);

//Get all device due for upgrade
router.get("/due-upgrade", getDeviceDueUpgrade);

//Get all device's stats
router.get("/devices-stats", getDevicesStats);

//Get all device needing approval
router.get("/requires-approval", getDeviceForApproval);

//Get all device loaned
router.get("/loaned-devices", getLoanedDevices);

//Get all device due return at user termination
router.get("/devices-due-return", getDevicesDueReturn);

//Get all devices
router.get("/:id", getDevice);

//Get all devices details
router.get("/device-details/:id", getDeviceDetails);

//Get all devices details
router.get("/user-devices/:user_id", getDevicesAssigned);

//Create new device
router.post("/add-device", createDevice);

//bilk create devices
router.post("/bulk-add-devices", bulkCreateDevice);

//Update device
router.put("/update-device/:id", updateDevice);

//assign device
router.put("/assign-device/:id", assignDevice);

//loan device
router.put("/loan-device/:id", loanDevice);

//release device
router.put("/release-device/:id", releaseDevice);

//reject device
router.put("/reject-device/:id", rejectDeviceIssueLoan);

//approve device
router.put("/approve-device/:id", approveDevice);

//Delete device
router.put("/delete-device/:id", deleteDevice);

module.exports = router;
