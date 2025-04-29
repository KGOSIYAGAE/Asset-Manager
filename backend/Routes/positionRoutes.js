const express = require("express");
const router = express.Router();
const { getAllPositions } = require("../Controllers/positionController");

//Get All positions
router.get("/", getAllPositions);

module.exports = router;
