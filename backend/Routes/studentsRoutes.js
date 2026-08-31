const express = require("express");
const router = express.Router();
const { getStudents, getStudentDetails, createStudent, bulkCreateStudents, updateStudent, deleteStudent, getStudentsStats } = require("../Controllers/studentsController");

const requireAuth = require("../middleware/requireAuth");

//
router.use(requireAuth);

//get staff staff
router.get("/students-stats", getStudentsStats);

//Get all students
router.get("/", getStudents);

//Get student by id
router.get("/:student_no", getStudentDetails);

//Create student
router.post("/create-student/", createStudent);

//Create student
router.post("/bulk-create-student/", bulkCreateStudents);

//Update student
router.put("/update-student/:student_no", updateStudent);

//Delete student
router.put("/delete-student/:student_no", deleteStudent);

module.exports = router;
