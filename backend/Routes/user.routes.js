const express = require("express");
const router = express.Router();
const { loginUser, signupUser } = require("../Controllers/user.controller");

//Login
router.post("/login", loginUser);

//Signup
router.post("/signup", signupUser);

module.exports = router;
