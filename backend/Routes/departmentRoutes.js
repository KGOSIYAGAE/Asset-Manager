const express = require("express");
const router = express.Router();
const { getAllDepartments } = require("../Controllers/departmentController");

//get all department
router.get("/", getAllDepartments);

module.exports = router;
