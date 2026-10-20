const express = require("express");
const router = express.Router();
const { createAzureGraphConfig, getAzureGraphConfig, updateAzureGraphConfig } = require("../Controllers/azureGraphController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

//create config
router.post("/create-config", createAzureGraphConfig);

//get config
router.get("/config", getAzureGraphConfig);

//update config
router.put("/update-config/:config_id", updateAzureGraphConfig);

module.exports = router;
