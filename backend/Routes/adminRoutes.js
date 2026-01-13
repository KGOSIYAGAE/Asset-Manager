const express = require("express");

const router = express.Router();
const { login, signUp, changePassword, updateStaffRole } = require("../Controllers/adminController");

//Admin Login
router.post("/login", login);

//Create Admin
router.post("/signup", signUp);

//Change Admin password
router.put("/change-password", changePassword);

//Update Admin role
router.put("/update-role", updateStaffRole);

module.exports = router;
