const express = require("express");
const router = express.Router();
const { getAllStaff, getStaff, createStaff, bulkCreateStaff, updateStaff, deleteStaff } = require("../Controllers/staffController");

//get all staff
router.get("/", getAllStaff);

//get staff by id
router.get("/:id", getStaff);

//Create staff
router.post("/create-staff/", createStaff);

//Bulk create staff
router.post("/bulk-create-staff/", bulkCreateStaff);

//Update staff
router.put("/update-staff/:id", updateStaff);

//delete staff
router.delete("/delete-staff/:staff_no", deleteStaff);

module.exports = router;
