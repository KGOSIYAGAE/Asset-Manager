const express = require("express");
const router = express.Router();

const { getInvoices } = require("../Controllers/invoiceController");

const requireAuth = require("../middleware/requireAuth");

//
router.use(requireAuth);

//Get All inovices
router.get("/", getInvoices);

module.exports = router;
