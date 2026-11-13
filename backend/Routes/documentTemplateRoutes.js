const express = require("express");
const router = express.Router();
const { getDocumentTemplates, createDocumentTemplate, getDocumentTemplate, updateDocumentTemplate, deleteDocumentTemplate } = require("../Controllers/documentTemplateController");

//router.use(requireAuth);

//create document
router.post("/create-template", createDocumentTemplate);

//get all document
router.get("/", getDocumentTemplates);

//get a document
router.get("/document/", getDocumentTemplate);

//update a document
router.put("/update-template/:document_id", updateDocumentTemplate);

//soft delete a document
router.put("/delete-template/:document_id", deleteDocumentTemplate);

module.exports = router;
