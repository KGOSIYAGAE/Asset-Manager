const express = require("express");
const router = express.Router();
const { getAllCourses } = require("../Controllers/courseController");

//Get all courses
router.get("/", getAllCourses);

module.exports = router;
