const express = require("express");
const router = express.Router();

const { getAllStaff, getStaff, createStaff, deleteStaff, updateStaff } = require("../Controllers/staff.controllers");

//Get All Staff
router.get("/staff", getAllStaff);

//Get Staff
router.get("/staff/:id", getStaff);

//Create new Staff
router.post("/staff/add-staff", createStaff);

//Delete Staff
router.delete("/staff/delete-staff/:staff_no", deleteStaff);

//Update Staff
router.put("/staff/update-staff/:id", updateStaff);

module.exports = router;
