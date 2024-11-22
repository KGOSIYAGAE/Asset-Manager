const express = require("express");
const router = express.Router();

const { getAllStudents, getStudent, addStudents, updateStudent, deleteStudent } = require("../Controllers/students.controller");

//Get All Students
router.get("/students", getAllStudents);

//Get Student
router.get("/students/get-student/:student_no", getStudent);

//Add Student
router.post("/students/add-student", addStudents);

//Update Student
router.put("/students/update-student/:student_no", updateStudent);

//delete Student
router.delete("/students/delete-student/:student_no", deleteStudent);

module.exports = router;
