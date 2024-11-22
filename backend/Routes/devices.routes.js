const express = require("express");
const router = express.Router();
const { getAllDevices } = require("../Controllers/devices.controller");

router.get("/", getAllDevices());
