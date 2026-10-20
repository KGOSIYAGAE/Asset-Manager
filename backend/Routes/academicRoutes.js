const express = require("express");
const router = express.Router();
const { getCourses, getCoursesOfFaculty, createCourse, updateCourse, getFaculties, deleteCourse, createFaculty, updateFaculty, deleteFaculty } = require("../Controllers/academicController");
const requireAuth = require("../middleware/requireAuth");

//
//router.use(requireAuth);

//Get All departments
router.get("/courses/", getCourses);
//Get departs of faculty
router.get("/faculty-courses/:facultyId", getCoursesOfFaculty);
//create department
router.post("/create-course/", createCourse);
//update department
router.put("/update-course/:course_id", updateCourse);
//delete faculty
router.put("/delete-course/:course_id", deleteCourse);

//Get All faculties
router.get("/faculties/", getFaculties);
//create faculty
router.post("/faculties/create-faculty/", createFaculty);
//update faculty
router.put("/faculties/update-faculty/:faculty_id", updateFaculty);
//delete faculty
router.put("/faculties/delete-faculty/:faculty_id", deleteFaculty);

module.exports = router;
