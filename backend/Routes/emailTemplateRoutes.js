const express = require("express");
const router = express.Router();
const { createEmailTemplate, getEmailTemplates, updateEmailTemplate, deleteEmailTemplate } = require("../Controllers/emailTemplateController");

//router.use(requireAuth);

//create config
router.post("/create-template", createEmailTemplate);

//get config
router.get("/", getEmailTemplates);

//update config
router.put("/update-template/:template_id", updateEmailTemplate);

//update config
router.put("/delete-template/:template_id", deleteEmailTemplate);

module.exports = router;
