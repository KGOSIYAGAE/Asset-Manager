const express = require("express");
const router = express.Router();
const { createDocumentTemplate, getDocumentTemplate, updateDocumentTemplate, deleteDocumentTemplate } = require("../Controllers/documentTemplateController");

//create config
router.post("/create-template", createDocumentTemplate);

//get config
router.get("/", getDocumentTemplate);

//update config
router.put("/update-template/:document_id", updateDocumentTemplate);

//update config
router.put("/delete-template/:document_id", deleteDocumentTemplate);

module.exports = router;
