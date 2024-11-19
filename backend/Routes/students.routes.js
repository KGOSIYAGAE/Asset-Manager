const express = require("express");
const router = express.Router();

const { getAllStudents } = require("../Controllers/students.controller");

//Get All Students
router.get("/students", getAllStudents);

module.exports = router;
