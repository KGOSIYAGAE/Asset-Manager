const express = require("express");
const router = express.Router();

const { getAllStaff, createStaff, deleteStaff } = require("../Controllers/staff.controllers");

//Get All Staff
router.get("/staff", getAllStaff);

//Create new Staff
router.post("/staff/add-staff", createStaff);

//Delete Staff
router.delete("/staff/delete-staff/:staff_no", deleteStaff);

module.exports = router;
