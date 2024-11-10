const express = require("express");
const router = express.Router();

const { getAllStaff, createStaff, deleteStaff, updateStaff } = require("../Controllers/staff.controllers");

//Get All Staff
router.get("/staff", getAllStaff);

//Create new Staff
router.post("/staff/add-staff", createStaff);

//Delete Staff
router.delete("/staff/delete-staff/:staff_no", deleteStaff);

//Update Staff
router.put("/staff/update-staff/:staff_no", updateStaff);

module.exports = router;
