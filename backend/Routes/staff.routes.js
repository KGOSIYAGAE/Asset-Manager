const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const { getAllStaff, getStaff, createStaff, deleteStaff, updateStaff } = require("../Controllers/staff.controllers");

//Protect routes from unathorised
router.use(requireAuth);

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
