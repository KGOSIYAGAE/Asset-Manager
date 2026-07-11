const express = require("express");
const router = express.Router();
const { createRepair, getAllrepairs, getAllrepairsForTech, getRepairsStats, getRepairsStatsForTech } = require("../Controllers/deviceRepairController");

//onst requireAuth = require("../middleware/requireAuth");
//const checkRole = require("../middleware/checkRole");

//get all repairs
router.get("/", getAllrepairs);

//get all repairs
router.get("/assigned", getAllrepairsForTech);

//get all repairs stats
router.get("/all-stats", getRepairsStats);

//get all repairs stats for tech
router.get("/all-stats-tech", getRepairsStatsForTech);

//Create new device
router.post("/create-repair", createRepair);

module.exports = router;
