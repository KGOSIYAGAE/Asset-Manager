const express = require("express");

const router = express.Router();
const { login, signUp } = require("../Controllers/adminController");

//Admin Login
router.post("/login", login);

//Create Admin
router.post("/signup", signUp);

module.exports = router;
