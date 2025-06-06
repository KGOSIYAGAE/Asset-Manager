const express = require("express");
const router = express.Router();
const { getAllDepartments } = require("../Controllers/departmentController");

const requireAuth = require("../middleware/requireAuth");

//
router.use(requireAuth);

//get all department
router.get("/", getAllDepartments);

module.exports = router;
