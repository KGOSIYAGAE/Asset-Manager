const express = require("express");

const router = express.Router();
const { login, signUp, changePassword, assignStaffRole, updateStaffRole, getAdmins } = require("../Controllers/adminController");

//Get Admins
router.get("/", getAdmins);

//Admin Login
router.post("/login", login);

//Create Admin
router.post("/signup", signUp);

//Change Admin password
router.put("/change-password", changePassword);

//Assign Admin role
router.put("/assign-role", assignStaffRole);

//Update Admin role
router.put("/update-role", updateStaffRole);

module.exports = router;
