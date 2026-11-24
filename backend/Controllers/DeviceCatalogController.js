const { query } = require("../util/pg_dbConnection");

//get Device categories
const getDeviceCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "device_categories" `;
    const getDetailsQuery = `SELECT * FROM "deviceCategoriesDetails" LIMIT $1 OFFSET $2 `;

    //Get device count
    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching catgeories", error: true });
    }

    const totalCategories = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalCategories / limit);
    const { rows } = await query(getDetailsQuery, [limit, offset]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching ctagories", error: true });
    }

    return res.status(200).json({ totalPages: totalPages, categories: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//create category
const createDeviceCategory = async (req, res) => {
  try {
    const { category_name, device_type } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: "Category name is required", error: true });
    }

    if (!device_type) {
      return res.status(400).json({ message: "Category type is required", error: true });
    }

    const checkIfExist = "SELECT * FROM device_categories WHERE category_name = $1";
    const exist = await query(checkIfExist, [category_name]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Category already exist", error: true });
    }

    const create_query = "INSERT INTO device_categories(category_name,device_type,created_at, updated_at, is_deleted) VALUES ($1,$2, NOW(), NOW(),'FALSE')";

    const { rowCount } = await query(create_query, [category_name, device_type]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured creating category.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Category successfully created", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//update category
const updateDeviceCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const { category_name, device_type } = req.body;

    if (!category_id) {
      return res.status(400).json({ message: "Category id is required", error: true });
    }

    if (!category_name) {
      return res.status(400).json({ message: "Category name is required", error: true });
    }

    if (!device_type) {
      return res.status(400).json({ message: "Category type is required", error: true });
    }

    const checkIfExist = "SELECT * FROM device_categories WHERE category_name = $1";
    const exist = await query(checkIfExist, [category_name]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Category already exist", error: true });
    }

    const update_query = "UPDATE device_categories SET category_name=$1, device_type=$2, updated_at=NOW() WHERE category_id = $3";

    const { rowCount } = await query(update_query, [category_name, device_type, category_id]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured updating category.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Category successfully updated", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//delete category
const deleteDeviceCategory = async (req, res) => {
  try {
    const { category_id } = req.params;

    if (!category_id) {
      return res.status(400).json({ message: "Category id is required", error: true });
    }

    const update_query = "UPDATE device_categories SET is_deleted=true, updated_at=NOW() WHERE category_id = $1";

    const { rowCount } = await query(update_query, [category_id]);

    if (rowCount <= 0) {
      console.log("error deleting");
      return res.status(400).json({ message: "An error occured deleting Category.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Category successfully deleted", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//////////////////////////////////////////////////////////////////////////////////////

//get All Device Make of category
const getDeviceCategoryManufacture = async (req, res) => {
  try {
    const { category_id } = req.params;

    if (!category_id) {
      return res.status(400).json({ message: "Category id is required", error: true });
    }

    /*const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "manufacturers" WHERE category_id = $1`;
*/
    const getDetailsQuery = `SELECT * FROM "manufacturers" WHERE category_id = $1`;

    /*Get device count
    const countResponse = await query(countQuery, [category_id]);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching manufactures", error: true });
    }

    const totalManufactures = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalManufactures / limit);
*/
    const { rows } = await query(getDetailsQuery, [category_id]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching manufactures", error: true });
    }

    return res.status(200).json({ manufactures: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//get All Device Manufacturers
const getAllDeviceManufactures = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "deviceManufacturerDetails" `;

    const getDetailsQuery = `SELECT * FROM "deviceManufacturerDetails" LIMIT $1 OFFSET $2 `;

    //Get device count
    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching manufactures", error: true });
    }

    const totalManufactures = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalManufactures / limit);
    const { rows } = await query(getDetailsQuery, [limit, offset]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching manufactures", error: true });
    }

    return res.status(200).json({ totalPages: totalPages, manufactures: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//get All Device Make
const getAllDeviceManufactureList = async (req, res) => {
  try {
    /*const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "manufacturers" `;
*/
    const getDetailsQuery = `SELECT * FROM "manufacturers"`;

    /*Get device count
    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching manufactures", error: true });
    }

    const totalManufactures = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalManufactures / limit);
*/
    const { rows } = await query(getDetailsQuery);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching manufactures", error: true });
    }

    return res.status(200).json({ manufactures: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//update Manufacturers
const updateDeviceManufacture = async (req, res) => {
  try {
    const { manufacturer_id } = req.params;
    const { manufacturer_name, description, category_id } = req.body;

    if (!manufacturer_id) {
      return res.status(400).json({ message: "Manufacturer id is required", error: true });
    }

    if (!manufacturer_name) {
      return res.status(400).json({ message: "Manufacturer name is required", error: true });
    }

    if (!description) {
      return res.status(400).json({ message: "Manufacturer description is required", error: true });
    }

    if (!category_id) {
      return res.status(400).json({ message: "Category id is required", error: true });
    }

    /*const checkIfExist = "SELECT * FROM manufacturers WHERE manufacturer_name = $1";
    const exist = await query(checkIfExist, [manufacturer_name]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Manufacturer already exist", error: true });
    }*/

    const update_query = "UPDATE manufacturers SET manufacturer_name=$1, description=$2, category_id=$3, updated_at=NOW() WHERE manufacturer_id = $4";

    const { rowCount } = await query(update_query, [manufacturer_name, description, category_id, manufacturer_id]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured updating Manufacturer.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Manufacturer successfully updated", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//update Manufacturers
const createDeviceManufacture = async (req, res) => {
  try {
    const { manufacturer_name, description, category_id } = req.body;

    if (!manufacturer_name) {
      return res.status(400).json({ message: "Manufacturer name is required", error: true });
    }

    if (!description) {
      return res.status(400).json({ message: "Manufacturer description is required", error: true });
    }

    if (!category_id) {
      return res.status(400).json({ message: "Category id is required", error: true });
    }

    const checkIfExist = "SELECT * FROM manufacturers WHERE manufacturer_name = $1 AND category_id = $2";
    const exist = await query(checkIfExist, [manufacturer_name, category_id]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Manufacturer already exist", error: true });
    }

    const create_query = "INSERT INTO manufacturers(manufacturer_name,description,category_id,created_at, updated_at, is_deleted) VALUES ($1,$2,$3, NOW(), NOW(),'FALSE')";

    const { rowCount } = await query(create_query, [manufacturer_name, description, category_id]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured creating manufacturer.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Manufacturer successfully created", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//delete Manufacturer
const deleteDeviceManufacturer = async (req, res) => {
  try {
    const { manufacturer_id } = req.params;

    if (!manufacturer_id) {
      return res.status(400).json({ message: "Manufacturer id is required", error: true });
    }

    const update_query = "UPDATE manufacturers SET is_deleted=true, updated_at=NOW() WHERE manufacturer_id = $1";

    const { rowCount } = await query(update_query, [manufacturer_id]);

    if (rowCount <= 0) {
      console.log("error deleting");
      return res.status(400).json({ message: "An error occured deleting Manufacturer.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Manufacturer successfully deleted", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
////////////////////////////////////////////////////////////

//get All Device Make of category
const getDeviceManufacture = async (req, res) => {
  try {
    const { manufacture_id } = req.params;

    if (!manufacture_id) {
      return res.status(400).json({ message: "Manufacture id is required", error: true });
    }

    const getDetailsQuery = `SELECT * FROM "manufacturers" WHERE manufacture_id = $1  `;

    const { rows } = await query(getDetailsQuery, [manufacture_id]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching manufactures", error: true });
    }

    return res.status(200).json({ totalPages: totalPages, manufactures: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

/////////////////////////////////////////////////////////////////////////
//get All Device models of manufacture
const getDeviceManufactureModelsList = async (req, res) => {
  try {
    const { manufacture_id } = req.params;

    if (!manufacture_id) {
      return res.status(400).json({ message: "Manufacture id is required", error: true });
    }

    /* const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;*/

    //Get total device that need approval
    //const countQuery = `SELECT COUNT(*) AS total FROM "device_models" WHERE manufacture_id = $1 `;

    const getDetailsQuery = `SELECT * FROM "device_models" WHERE manufacture_id = $1`;

    /*Get device count
    const countResponse = await query(countQuery, [manufacture_id]);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching models", error: true });
    }

    const totalModels = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalModels / limit);*/

    const { rows } = await query(getDetailsQuery, [manufacture_id]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching models", error: true });
    }

    return res.status(200).json({ models: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//get All Device models of manufacture paged
const getDeviceManufactureModels = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "deviceModelDetails"`;

    const getDetailsQuery = `SELECT * FROM "deviceModelDetails" LIMIT $1 OFFSET $2 `;

    //Get device count
    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching models", error: true });
    }

    const totalModels = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalModels / limit);

    const { rows } = await query(getDetailsQuery, [limit, offset]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching models", error: true });
    }

    return res.status(200).json({ totalPages: totalPages, models: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//update model
const updateDeviceModel = async (req, res) => {
  try {
    const { model_id } = req.params;
    const { model_name, specification, manufacturer_id } = req.body;

    if (!model_id) {
      return res.status(400).json({ message: "Model id is required", error: true });
    }

    if (!model_name) {
      return res.status(400).json({ message: "Model name is required", error: true });
    }

    if (!specification) {
      return res.status(400).json({ message: "Model specification is required", error: true });
    }

    if (!manufacturer_id) {
      return res.status(400).json({ message: "Manufacturer id is required", error: true });
    }

    /*const checkIfExist = "SELECT * FROM manufacturers WHERE manufacturer_name = $1";
    const exist = await query(checkIfExist, [manufacturer_name]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Manufacturer already exist", error: true });
    }*/

    const update_query = "UPDATE device_models SET model_name=$1, specification=$2, manufacture_id=$3, updated_at=NOW() WHERE model_id = $4";

    const { rowCount } = await query(update_query, [model_name, specification, manufacturer_id, model_id]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured updating Model.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Model successfully updated", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//update model
const createDeviceModel = async (req, res) => {
  try {
    const { model_name, specification, manufacturer_id } = req.body;

    if (!model_name) {
      return res.status(400).json({ message: "Model name is required", error: true });
    }

    if (!specification) {
      return res.status(400).json({ message: "Model specification is required", error: true });
    }

    if (!manufacturer_id) {
      return res.status(400).json({ message: "Manufacturer id is required", error: true });
    }

    const checkIfExist = "SELECT * FROM device_models WHERE model_name = $1 AND manufacture_id = $2";
    const exist = await query(checkIfExist, [model_name, manufacturer_id]);

    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "Model already exist", error: true });
    }

    const create_query = "INSERT INTO device_models(model_name,specification,manufacture_id,created_at, updated_at, is_deleted) VALUES ($1,$2,$3, NOW(), NOW(),'FALSE')";

    const { rowCount } = await query(create_query, [model_name, specification, manufacturer_id]);

    if (rowCount <= 0) {
      console.log("error creating");
      return res.status(400).json({ message: "An error occured creating Model.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Model successfully created", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
//delete model
const deleteDeviceModel = async (req, res) => {
  try {
    const { model_id } = req.params;

    if (!model_id) {
      return res.status(400).json({ message: "Model id is required", error: true });
    }

    const update_query = "UPDATE device_models SET is_deleted=true, updated_at=NOW() WHERE model_id = $1";

    const { rowCount } = await query(update_query, [model_id]);

    if (rowCount <= 0) {
      console.log("error deleting");
      return res.status(400).json({ message: "An error occured deleting Model.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Model successfully deleted", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = {
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
};
