const express = require("express");
const router = express.Router();
const {
  getDeviceCategory,
  createDeviceCategory,
  updateDeviceCategory,
  deleteDeviceCategory,
  getAllDeviceManufactures,
  getAllDeviceManufactureList,
  updateDeviceManufacture,
  createDeviceManufacture,
  deleteDeviceManufacturer,
  getDeviceCategoryManufacture,
  getDeviceManufactureModelsList,
  getDeviceManufactureModels,
  updateDeviceModel,
  createDeviceModel,
  deleteDeviceModel,
} = require("../Controllers/DeviceCatalogController");
const requireAuth = require("../middleware/requireAuth");

//
//router.use(requireAuth);

//Get All categories
router.get("/category/", getDeviceCategory);
//create category
router.post("/create-category/", createDeviceCategory);
//update category
router.put("/update-category/:category_id", updateDeviceCategory);
//delete category
router.put("/delete-category/:category_id", deleteDeviceCategory);
///////////////////////////////////////////////////////////////////////////

//Get All manufactures
router.get("/manufacturers/", getAllDeviceManufactures);
//Get All manufactures
router.get("/manufacturers/list", getAllDeviceManufactureList);
//Get manufacture of category
router.get("/manufacturers/:category_id", getDeviceCategoryManufacture);
//update manufacturer
router.put("/update-manufacturer/:manufacturer_id", updateDeviceManufacture);
//create manufacturer
router.post("/create-manufacturer/", createDeviceManufacture);
//delete manufacturer
router.put("/delete-manufacturer/:manufacturer_id", deleteDeviceManufacturer);
///////////////////////////////////////////////////////////////////////////

//Get models of manufacture
router.get("/models/:manufacture_id", getDeviceManufactureModelsList);
//Get models of manufacture
router.get("/models/", getDeviceManufactureModels);
//update model
router.put("/update-model/:model_id", updateDeviceModel);
//create model
router.post("/create-model/", createDeviceModel);
//delete model
router.put("/delete-model/:model_id", deleteDeviceModel);

module.exports = router;
