const express = require("express");
const router = express.Router();
const { search } = require("../Controllers/searchController");

//const requireAuth = require("../middleware/requireAuth");

//
//router.use(requireAuth);

//get all staff
router.get("/", search);

module.exports = router;
