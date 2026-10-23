const express = require("express");
const router = express.Router();
const {
  createRepair,
  udateRepair,
  getAllrepairs,
  getAllrepairsForTech,
  getRepairsStats,
  getRepairsStatsForTech,
  getRepair,
  updateStatus,
  getRepairProgress,
} = require("../Controllers/deviceRepairController");

const requireAuth = require("../middleware/requireAuth");
//const checkRole = require("../middleware/checkRole");

//
//router.use(requireAuth);

//get all repairs
router.get("/", getAllrepairs);

//Get repair
router.get("/repair-details/:id", getRepair);

//Get repair progress
router.get("/repair-progress/:id", getRepairProgress);

//get all repairs
router.get("/assigned", getAllrepairsForTech);

//get all repairs stats
router.get("/all-stats", getRepairsStats);

//get all repairs stats for tech
router.get("/all-stats-tech", getRepairsStatsForTech);

//Create new device
router.post("/create-repair", createRepair);

//Update repair
router.put("/update-repair/:id", udateRepair);

//Update status
router.put("/update-repair-status", updateStatus);

module.exports = router;
