const express = require("express");
const router = express.Router();
const { getAllStaff, getStaff, createStaff, bulkCreateStaff } = require("../Controllers/staffController");

//get all staff
router.get("/", getAllStaff);

//get staff by id
router.get("/:id", getStaff);

//Create staff
router.post("/create-staff/", createStaff);

//Bulk create staff
router.post("/bulk-create-staff/", bulkCreateStaff);

module.exports = router;
