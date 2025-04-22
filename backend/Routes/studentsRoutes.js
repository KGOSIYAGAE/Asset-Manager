const express = require("express");
const router = express.Router();
const { getStudents, getStudentDetails } = require("../Controllers/studentsController");

//Get all students
router.get("/", getStudents);

//Get student by id
router.get("/:student_no", getStudentDetails);

module.exports = router;
