const express = require("express");

const router = express.Router();
const { getAdmin, createAdmin } = require("../Controllers/adminController");

//Admin Login
router.post("/login", getAdmin);

//Create Admin
router.post("/signup", createAdmin);

module.exports = router;
