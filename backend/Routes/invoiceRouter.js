const express = require("express");
const router = express.Router();

const { getInvoices } = require("../Controllers/invoiceController");

//Get All inovices
router.get("/", getInvoices);

module.exports = router;
