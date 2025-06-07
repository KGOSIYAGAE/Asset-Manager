const express = require("express");

const router = express.Router();
const { login, signUp, changePassword } = require("../Controllers/adminController");

//Admin Login
router.post("/login", login);

//Create Admin
router.post("/signup", signUp);

//Change Admin password
router.put("/change-password", changePassword);

module.exports = router;
