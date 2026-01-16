const express = require("express");
const router = express.Router();
const { getSignatures, getUserSignatures, createSignature, getIssuerAndApproverSignatures } = require("../Controllers/signatureController");

//Get All signatures
router.get("/", getSignatures);

//Get user signature
router.get("/:user_id", getUserSignatures);

//Get user signature
router.post("/create-signature", createSignature);

//Get user signature
router.get("/issuer-approver-signature/:device_id", getIssuerAndApproverSignatures);

module.exports = router;
