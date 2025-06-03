const express = require("express");
const router = express.Router();
const { getAllStaff, getStaff, getStaffDetails, createStaff, bulkCreateStaff, updateStaff, deleteStaff } = require("../Controllers/staffController");

//get all staff
router.get("/", getAllStaff);

//get staff by id
router.get("/:id", getStaff);

//get staff by staff_no
router.get("/staff-details/:staff_no", getStaffDetails);

//Create staff
router.post("/create-staff/", createStaff);

//Bulk create staff
router.post("/bulk-create-staff/", bulkCreateStaff);

//Update staff
router.put("/update-staff/:id", updateStaff);

//delete staff
router.delete("/delete-staff/:staff_no", deleteStaff);

module.exports = router;
