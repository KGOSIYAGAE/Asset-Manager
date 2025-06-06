const express = require("express");
const router = express.Router();
const { getAllCourses } = require("../Controllers/courseController");

const requireAuth = require("../middleware/requireAuth");

//
router.use(requireAuth);

//Get all courses
router.get("/", getAllCourses);

module.exports = router;
