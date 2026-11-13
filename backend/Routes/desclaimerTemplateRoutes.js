const express = require("express");
const router = express.Router();
const { createDisclaimerTemplate, getDisclaimerTemplates, updateDisclaimerTemplate, getDisclaimerTemplate } = require("../Controllers/disclaimerTemplateController");

//router.use(requireAuth);

//create document
router.post("/create-template", createDisclaimerTemplate);

//get all document
router.get("/", getDisclaimerTemplates);

//get a document
router.get("/disclaimer/", getDisclaimerTemplate);

//update a document
router.put("/update-template/:disclaimer_id", updateDisclaimerTemplate);

//soft delete a document
//router.put("/delete-template/:document_id", deleteDocumentTemplate);

module.exports = router;
