const express = require("express");
const router = express.Router();
const { getStudents, getStudentDetails, createStudent } = require("../Controllers/studentsController");

//Get all students
router.get("/", getStudents);

//Get student by id
router.get("/:student_no", getStudentDetails);

//Create student
router.post("/create-student/", createStudent);

module.exports = router;
