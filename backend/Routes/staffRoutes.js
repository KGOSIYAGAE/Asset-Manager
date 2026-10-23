const express = require("express");
const router = express.Router();
const { getAllStaff, getStaff, getSupportAdmins, getStaffDetails, createStaff, bulkCreateStaff, updateStaff, deleteStaff, getStaffStats } = require("../Controllers/staffController");

const requireAuth = require("../middleware/requireAuth");

//
router.use(requireAuth);

//get staff staff
router.get("/staff-stats", getStaffStats);

//get all staff
router.get("/", getAllStaff);

//get staff by id
router.get("/:id", getStaff);

//get staff by id
router.get("/support-admins/", getSupportAdmins);

//get staff by staff_no
router.get("/staff-details/:staff_no", getStaffDetails);

//Create staff
router.post("/create-staff/", createStaff);

//Bulk create staff
router.post("/bulk-create-staff/", bulkCreateStaff);

//Update staff
router.put("/update-staff/:id", updateStaff);

//delete staff
router.put("/delete-staff/:staff_no", deleteStaff);

module.exports = router;
