const express = require("express");
const router = express.Router();

const { getAllStaff, createStaff } = require("../Controllers/staff.controllers");

//Get All Staff
router.get("/staff", getAllStaff);

//Create new Staff
router.post("/staff/add-staff", createStaff);

module.exports = router;
