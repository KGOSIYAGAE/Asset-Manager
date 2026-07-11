const { query } = require("../util/pg_dbConnection");
const format = require("pg-format");
const { createNewLog } = require("./deviceTransactionsController");

//Check Previous device status
const checkDeviceStatus = async (id) => {
  try {
    if (!id) {
      return res.status(400).json({ message: "Device id not provided", error: true });
    }

    const getDeviceQuery = "SELECT * FROM devices WHERE id = $1";

    const { rows } = await query(getDeviceQuery, [id]);

    if (!rows) {
      return res.status(400).json({ message: "Device matching the id not found", error: true });
    }

    return rows[0].status;
  } catch (error) {
    return console.log(error);
  }
};

//Get all devices due for upgrade
const getDeviceDueUpgrade = async (req, res) => {
  try {
    // const GET_ALL_QUERY = `SELECT * FROM "deviceUserDetails" WHERE next_upgrade_date < CURRENT_DATE AND category = 'Laptop'`;

    /*const { rows } = await query(GET_ALL_QUERY);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }*/

    return res.status(200).json({ deviceList: [], message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

/*Create device
const createDevice = async (req, res) => {
  try {
    const { assetTag, make, model, serial_no, spec, category, device_condition, status, warranty_end_date, supplier_name, invoice_no, device_type, purchaseValue, currentValue } = req.body;

    //return res.status(400).json({ assetTag, make, model, serial_no, spec, category, device_condition, status, warranty_end_date, invoice_no, purchaseValue, currentValue });

    if (!assetTag) {
      return res.status(400).json({ message: "Asset Tag is required!" });
    }
    if (!make) {
      return res.status(400).json({ message: "Make is required!" });
    }
    if (!model) {
      return res.status(400).json({ message: "Model is required!" });
    }
    if (!serial_no) {
      return res.status(400).json({ message: "Serial number is required!" });
    }
    if (!spec) {
      return res.status(400).json({ message: "Specification is required!" });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required!" });
    }
    if (!device_condition) {
      return res.status(400).json({ message: "Device condition is required!" });
    }
    if (!status) {
      return res.status(400).json({ message: "Device status is required!" });
    }
    if (!warranty_end_date) {
      return res.status(400).json({ message: "Warranty end date is required!" });
    }
    if (!supplier_name) {
      return res.status(400).json({ message: "Supplier name is required!" });
    }
    if (!invoice_no) {
      return res.status(400).json({ message: "Invoice id is required!" });
    }
    if (!device_type) {
      return res.status(400).json({ message: "Device type is required!" });
    }
    if (!purchaseValue) {
      return res.status(400).json({ message: "Purchase value is required!" });
    }
    if (!currentValue) {
      return res.status(400).json({ message: "Current value is required!" });
    }

    const create_device_query =
      "INSERT INTO devices(make, model, category, device_condition, status, asset_tag, serial_no, specification, warranty_end_date, purchase_price, value_price, supplier_name, invoice_number, device_type) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);";
    const VALUES = [make, model, category, device_condition, status, assetTag, serial_no, spec, warranty_end_date, purchaseValue, currentValue, supplier_name, invoice_no, device_type];

    const { rowCount } = await query(create_device_query, [...VALUES]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when creating a device", error: true });
    }

    //Create new log
    //createNewLog("Create", req.user, id, `Device successfully created.`);

    return res.status(200).json({ rowCount, message: "Successfully created", error: false });
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      return res.status(400).json({ message: `Device already exist` });
    }
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};*/

//Bulk create devices
const bulkCreateDevice = async (req, res) => {
  try {
    const { devices } = req.body;

    if (!Array.isArray(devices || devices.length === 0)) {
      return res.status(400).json({ message: "Invalid or empty device list", error: true });
    }

    const VALUES = devices.map((device) => [
      device.make,
      device.model,
      device.category,
      device.device_condition,
      device.status,
      device.assetTag,
      device.serial_no,
      device.device_type,
      device.spec,
      device.warranty_end_date,
      device.purchaseValue,
      device.currentValue,
      device.supplier_name,
      device.invoice_no,
      device.user_id,
      device.date_issued,
    ]);

    console.log(VALUES);

    const bulk_create_device_query = format(
      "INSERT INTO devices (make, model, category, device_condition, status, asset_tag, serial_no, device_type, specification, warranty_end_date, purchase_price, value_price, invoice_number, supplier_name, user_id, date_issued) VALUES %L",
      VALUES,
    );

    const { rowCount } = await query(bulk_create_device_query);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when adding devices", error: true });
    }

    //Create new log
    //createNewLog("Bulk create", req.user, id, `Device successfully created.`);

    return res.status(200).json({ rowCount, message: `${rowCount} devices successfully created.`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

/*Assign device
const assignDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, status, userId, date_issued, return_date, upgradeDate } = req.body;

    const previousStatus = await checkDeviceStatus(id);

    if (!id) {
      return res.status(400).json({ message: "Device Id not provided.", error: true });
    }

    if (!status || !userId || !date_issued) {
      return res.status(400).json({ message: "All fields must be provided.", error: true });
    }

    const assignDeviceQuery = "UPDATE devices SET status=$1, user_id=$2, date_issued=$3,return_date=$4, next_upgrade_date=$5 WHERE id=$6";
    const VALUES = [status, userId, date_issued, return_date, upgradeDate];

    const { rowCount } = await query(assignDeviceQuery, [...VALUES, id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when assigning the device", error: true });
    }

    //Create new log
    if (status === "Approval required") {
      createNewLog("Approval required", req.user, id, `Device assigning to ${fullName} requires approval.`);
    } else if (previousStatus === "Approval required" && status === "Assigned") {
      createNewLog("Approved", req.user, id, `Device assigning to ${fullName} has been approved.`);
      createNewLog("Assign", req.user, id, `Device successfully assigned to ${fullName}`);
    } else {
      createNewLog("Assign", req.user, id, `Device successfully assigned to ${fullName}`);
    }

    return res.status(200).json({ rowCount, message: `Device successfully assigned to ${fullName}`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};*/

//Loan device
/*const loanDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, status, userId, date_issued, return_date } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Device Id not provided.", error: true });
    }

    if (!status || !userId || !date_issued || !return_date) {
      return res.status(400).json({ message: "All fields must be provided.", error: true });
    }

    const assignDeviceQuery = "UPDATE devices SET status=$1, user_id=$2, date_issued=$3,return_date=$4 WHERE id=$5";
    const VALUES = [status, userId, date_issued, return_date];

    const { rowCount } = await query(assignDeviceQuery, [...VALUES, id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when loaning the device", error: true });
    }

    //Create new log
    createNewLog("Assign", req.user, id, `Device successfully loaned to ${fullName}`);

    return res.status(200).json({ rowCount, message: `Device successfully loaned to ${fullName}`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};*/

//release device
/*const releaseDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, status, userId, return_date, upgradeDate, date_issued } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Device Id not provided.", error: true });
    }

    const previousStatus = await checkDeviceStatus(id);

    if (!fullName || !status || !userId) {
      return res.status(400).json({ message: "All fields must be provided.", error: true });
    }

    const getDeviceQuery = `SELECT * FROM "deviceUserDetails" WHERE id = $1`;

    const { rows } = await query(getDeviceQuery, [id]);

    if (!rows) {
      return res.status(400).json({ message: "Device matching the id not found", error: true });
    }

    console.log(`Previous user ${rows[0].full_name}`);

    const assignDeviceQuery = "UPDATE devices SET status=$1, user_id=$2, return_date=$3, next_upgrade_date=$4 ,date_issued=$5  WHERE id=$6";
    const VALUES = [status, userId, return_date, upgradeDate, date_issued];

    const { rowCount } = await query(assignDeviceQuery, [...VALUES, id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when releasing the device from user", error: true });
    }

    //Create new log
    if (previousStatus === "Assigned") {
      createNewLog("Release", req.user, id, `Device successfully released from ${rows[0].full_name} to ${fullName}`);
    } else {
      createNewLog("Rejected", req.user, id, `Device assigning to ${rows[0].full_name} has been rejected.`);
    }

    return res.status(200).json({ rowCount, message: `Device successfully released from ${rows[0].full_name} to ${fullName}.`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};*/

//Delete device
/*const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Device Id must be provided", error: true });
    }

    const find_device_query = "SELECT * FROM devices WHERE id = $1";
    const { rowCount } = await query(find_device_query, [id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "Device matching Id not found", error: true });
    }

    const delete_device_query = "DELETE FROM devices WHERE id = $1";

    const { rows } = await query(delete_device_query, [id]);

    //Create new log
    createNewLog("Delete", req.user, id, `Device successfully deleted.`);

    return res.status(200).json({ message: "Device deleted successfully", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};*/

////////////////////////////////TETS///////////////////////////////////////////////////

//Create device
const createDevice = async (req, res) => {
  try {
    const { assetTag, make, model, serial_no, spec, category, device_condition, status, warranty_end_date, supplier_name, invoice_no, device_type, purchaseValue, currentValue } = req.body;

    //return res.status(400).json({ assetTag, make, model, serial_no, spec, category, device_condition, status, warranty_end_date, invoice_no, purchaseValue, currentValue });

    if (!assetTag) {
      return res.status(400).json({ message: "Asset Tag is required!" });
    }
    if (!make) {
      return res.status(400).json({ message: "Make is required!" });
    }
    if (!model) {
      return res.status(400).json({ message: "Model is required!" });
    }
    if (!serial_no) {
      return res.status(400).json({ message: "Serial number is required!" });
    }
    if (!spec) {
      return res.status(400).json({ message: "Specification is required!" });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required!" });
    }
    if (!device_condition) {
      return res.status(400).json({ message: "Device condition is required!" });
    }
    if (!status) {
      return res.status(400).json({ message: "Device status is required!" });
    }
    if (!warranty_end_date) {
      return res.status(400).json({ message: "Warranty end date is required!" });
    }
    if (!supplier_name) {
      return res.status(400).json({ message: "Supplier name is required!" });
    }
    if (!invoice_no) {
      return res.status(400).json({ message: "Invoice id is required!" });
    }
    if (!device_type) {
      return res.status(400).json({ message: "Device type is required!" });
    }
    if (!purchaseValue) {
      return res.status(400).json({ message: "Purchase value is required!" });
    }
    if (!currentValue) {
      return res.status(400).json({ message: "Current value is required!" });
    }

    const create_device_query =
      "INSERT INTO devices(make, model, category, device_condition, status, asset_tag, serial_no, specification, warranty_end_date, purchase_price, value_price, supplier_name, invoice_number, device_type,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14, NOW());";
    const VALUES = [make, model, category, device_condition, status, assetTag, serial_no, spec, warranty_end_date, purchaseValue, currentValue, supplier_name, invoice_no, device_type];

    const { rowCount } = await query(create_device_query, [...VALUES]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when creating a device", error: true });
    }

    //Create new log
    //createNewLog("Create", req.user, id, `Device successfully created.`);

    return res.status(200).json({ rowCount, message: "Successfully created", error: false });
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      return res.status(400).json({ message: `Device already exist` });
    }
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

//Update device
const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Device Id is required!", error: true });
    }

    console.log(req.body);

    const { assetTag, make, model, serial_no, spec, category, device_condition, status, warranty_end_date, invoice_no, purchaseValue, currentValue } = req.body;

    if (!assetTag) {
      return res.status(400).json({ message: "Asset Tag is required!", error: true });
    }
    if (!make) {
      return res.status(400).json({ message: "Make is required!", error: true });
    }
    if (!model) {
      return res.status(400).json({ message: "Model is required!", error: true });
    }
    if (!serial_no) {
      return res.status(400).json({ message: "Serial number is required!", error: true });
    }
    if (!spec) {
      return res.status(400).json({ message: "Specification is required!", error: true });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required!", error: true });
    }
    if (!device_condition) {
      return res.status(400).json({ message: "Device condition is required!", error: true });
    }
    if (!status) {
      return res.status(400).json({ message: "Device status is required!", error: true });
    }
    if (!warranty_end_date) {
      return res.status(400).json({ message: "Warranty end date is required!", error: true });
    }
    if (!invoice_no) {
      return res.status(400).json({ message: "Invoice number is required!", error: true });
    }
    if (!purchaseValue) {
      return res.status(400).json({ message: "Purchase value is required!", error: true });
    }
    if (!currentValue) {
      return res.status(400).json({ message: "Current value is required!", error: true });
    }

    const update_device_query =
      "UPDATE devices SET make=$1, model=$2, category=$3, device_condition=$4, status=$5, asset_tag=$6, serial_no=$7, specification=$8, warranty_end_date=$9, purchase_price=$10, value_price=$11, invoice_number=$12, updated_at=NOW() WHERE id =$13 ;";
    const VALUES = [make, model, category, device_condition, status, assetTag, serial_no, spec, warranty_end_date, purchaseValue, currentValue, invoice_no];

    const { rowCount } = await query(update_device_query, [...VALUES, id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when updating the device", error: true });
    }

    //Create new log
    createNewLog("Update", req.user, id, `Device successfully updated.`);

    return res.status(200).json({ rowCount, message: "Device successfully updated", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

//Get all devices that require approval
const getDeviceForApproval = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "deviceUserDetails" WHERE status = 'Loan Approval required' OR status= 'Issue Approval required'`;

    //Get the pagated data
    const dataQuery = `SELECT * FROM "deviceUserDetails" WHERE status = 'Loan Approval required' OR status= 'Issue Approval required' LIMIT $1 OFFSET $2`;

    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    const totalDevices = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalDevices / limit);

    const { rows } = await query(dataQuery, [limit, offset]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    return res.status(200).json({ deviceList: rows, totalPages: totalPages, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get all loaned devices
const getLoanedDevices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "deviceUserDetails" WHERE status = 'Loaned'`;

    //Get the pagated data
    const dataQuery = `SELECT * FROM "deviceUserDetails" WHERE status = 'Loaned' LIMIT $1 OFFSET $2`;

    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    const totalDevices = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalDevices / limit);

    const { rows } = await query(dataQuery, [limit, offset]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    return res.status(200).json({ deviceList: rows, totalPages: totalPages, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get all loaned devices
const getDevicesDueReturn = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "deviceUserDetails" WHERE status = 'Assigned' AND expected_return_date <= CURRENT_DATE`;

    //Get the pagated data
    const dataQuery = `SELECT * FROM "deviceUserDetails" WHERE status = 'Assigned' AND expected_return_date <= CURRENT_DATE LIMIT $1 OFFSET $2`;

    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    const totalDevices = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalDevices / limit);

    const { rows } = await query(dataQuery, [limit, offset]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    return res.status(200).json({ deviceList: rows, totalPages: totalPages, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get devices stats
const getDevicesStats = async (req, res) => {
  try {
    const getDevicesStatsQuery = `SELECT * FROM "devicesStats";`;

    const { rows } = await query(getDevicesStatsQuery);

    if (!rows) {
      return res.status(400).json({ message: "Device stats not found", error: true });
    }

    return res.status(200).json({ deviceDetails: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get device by id
const getDevice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Device id not provided", error: true });
    }

    const getDeviceQuery = "SELECT * FROM devices WHERE id = $1";

    const { rows } = await query(getDeviceQuery, [id]);

    if (!rows) {
      return res.status(400).json({ message: "Device matching the id not found", error: true });
    }

    return res.status(200).json({ deviceDetails: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get all devices
const getAllDevices = async (req, res) => {
  try {
    const userrole = req.userrole;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    if (!userrole) {
      return res.status(400).json({ message: "User role must be provided", error: true });
    }

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM "deviceUserDetails"`;

    //Get the pagated data
    const dataQuery = `SELECT * FROM "deviceDetails"
     WHERE device_type = 
      CASE 
        WHEN $1 = 'support_admin' THEN 'Support' 
        WHEN $1 = 'support_technician' THEN 'Support'
        WHEN $1 = 'networks_admin' THEN 'Network'
        WHEN $1 = 'networks_technician' THEN 'Network'
        WHEN $1 = 'av_admin' THEN 'Audio Visual'
        WHEN $1 = 'av_technician' THEN 'Ausio Visual'  
        ELSE device_type 
      END AND is_deleted = FALSE ORDER BY created_at DESC LIMIT $2 OFFSET $3 `;

    //Get device count
    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    const totalDevices = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalDevices / limit);

    const { rows } = await query(dataQuery, [userrole, limit, offset]);

    //const { rows } = await query(GET_ALL_QUERY, [userrole]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    return res.status(200).json({ deviceList: rows, totalPages: totalPages, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get all devices that need approval
{
  /*const getAllDevicesForApproval = async (req, res) => {
  try {
    const userrole = req.userrole;

    if (!userrole) {
      return res.status(400).json({ message: "User role must be provided", error: true });
    }

    const GET_ALL_QUERY = `SELECT * FROM "deviceDetails"
     WHERE device_type = 
      CASE 
        WHEN $1 = 'support_admin' THEN 'Support' 
        WHEN $1 = 'support_technician' THEN 'Support'
        WHEN $1 = 'networks_admin' THEN 'Network'
        WHEN $1 = 'networks_technician' THEN 'Network'
        WHEN $1 = 'av_admin' THEN 'Audio Visual'
        WHEN $1 = 'av_technician' THEN 'Ausio Visual'  
        ELSE device_type 
      END AND is_deleted = FALSE AND status LIKE '%Approval%' ORDER BY updated_at DESC LIMIT 8`;

    /*  const GET_ALL_QUERY = `SELECT * FROM devices 
     WHERE device_type = 
      CASE 
        WHEN $1 = 'support_admin' THEN 'Support' 
        WHEN $1 = 'support_technician' THEN 'Support'
        WHEN $1 = 'networks_admin' THEN 'Network'
        WHEN $1 = 'networks_technician' THEN 'Network'
        WHEN $1 = 'av_admin' THEN 'Audio Visual'
        WHEN $1 = 'av_technician' THEN 'Ausio Visual'  
        ELSE device_type 
      END ORDER BY created_at DESC`;*

    const { rows } = await query(GET_ALL_QUERY, [userrole]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    return res.status(200).json({ deviceList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};*/
}

//Get all device details by id
const getDeviceDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Device id not provided", error: true });
    }

    const getDeviceQuery = `SELECT * FROM "deviceUserDetails" WHERE id = $1`;

    const { rows } = await query(getDeviceQuery, [id]);

    if (!rows) {
      return res.status(400).json({ message: "Device matching the id not found", error: true });
    }

    return res.status(200).json({ deviceDetails: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get all device assigned to user by user_id
const getDevicesAssigned = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "Device id not provided", error: true });
    }

    const getDeviceQuery = `SELECT * FROM "deviceUserDetails" WHERE current_user_id = $1`;

    const { rows } = await query(getDeviceQuery, [user_id]);

    if (!rows) {
      return res.status(400).json({ message: "Device matching the id not found", error: true });
    }

    return res.status(200).json({ deviceList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Assign Device
const assignDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { issued_by, status, userId, userEndDate } = req.body;

    //const previousStatus = await checkDeviceStatus(id);

    if (!id) {
      return res.status(400).json({ message: "Device Id not provided.", error: true });
    }

    if (!status || !userId || !issued_by) {
      return res.status(400).json({ message: "All fields must be provided.", error: true });
    }

    //////////////////////////////////////////////////////////////////////////////

    //Verify if device exist
    const verifyDevice = "SELECT * FROM devices WHERE id=$1;";
    const { rows, rowCount } = await query(verifyDevice, [id]);

    if (rowCount === 0) {
      return res.status(400).json({ message: "Device not found", error: true });
    }

    //Verify if device is not assigned
    const device = rows[0];

    if (device.status !== "Available") {
      console.log(`Device cannot be issued. Current status is: ${device.status}`);
      return res.status(400).json({ message: `Device cannot be issued. Current status is: ${device.status}`, error: true });
    }

    //Create entry on the device transations table
    const createDeviceTransaction =
      "INSERT INTO device_transactions (device_serial_number, user_id, issued_by, status, expected_return_date, issue_date, action_type) VALUES ($1,$2,$3,$4,$5,NOW(), 'Issue');";
    const { rowData } = await query(createDeviceTransaction, [device.serial_no, userId, issued_by, status, userEndDate]);

    //Update Laptop current status and user
    const updateDeviceCurrentState = "UPDATE devices SET status=$1, current_user_id=$2, updated_at=NOW() WHERE id=$3";
    const deviceState = await query(updateDeviceCurrentState, [status, userId, id]);

    if (deviceState.rowCount === 0) {
      return res.status(400).json({ message: "Device not updated", error: true });
    }

    return res.status(200).json({ message: `Device state has been changed, Approval is required`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Loan device
const loanDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { issued_by, status, userId, expected_return_date } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Device Id not provided.", error: true });
    }

    if (!status || !userId || !issued_by || !expected_return_date) {
      return res.status(400).json({ message: "All fields must be provided.", error: true });
    }

    //////////////////////////////////////////////////////////////////////////////
    //Verify if device exist
    const verifyDevice = "SELECT * FROM devices WHERE id=$1;";
    const { rows, rowCount } = await query(verifyDevice, [id]);

    if (rowCount === 0) {
      return res.status(400).json({ message: "Device not found", error: true });
    }

    //Verify if device is not assigned
    const device = rows[0];

    if (device.status !== "Available") {
      console.log(`Device cannot be issued. Current status is: ${device.status}`);
      return res.status(400).json({ message: `Device cannot be issued. Current status is: ${device.status}`, error: true });
    }

    //Create entry on the device transations table
    const createDeviceTransaction =
      "INSERT INTO device_transactions (device_serial_number, user_id, issued_by, status, expected_return_date, issue_date, action_type) VALUES ($1,$2,$3,$4,$5, NOW(), 'Loan');";
    const { rowData } = await query(createDeviceTransaction, [device.serial_no, userId, issued_by, status, expected_return_date]);

    //Update Laptop current status and user
    const updateDeviceCurrentState = "UPDATE devices SET status=$1, current_user_id=$2, updated_at=NOW() WHERE id=$3";
    const deviceState = await query(updateDeviceCurrentState, [status, userId, id]);

    if (deviceState.rowCount === 0) {
      return res.status(400).json({ message: "Device not updated", error: true });
    }

    return res.status(200).json({ message: `Device state has been changed, Approval is required`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//release device
const releaseDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { returned_by, status } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Device Id not provided.", error: true });
    }

    if (!returned_by || !status) {
      return res.status(400).json({ message: "All fields must be provided.", error: true });
    }

    //Verify Device
    const verifyDevice = `SELECT * FROM devices WHERE id = $1`;
    const { rows } = await query(verifyDevice, [id]);

    if (!rows) {
      return res.status(400).json({ message: "Device matching the id not found", error: true });
    }

    const device = rows[0];

    //Update  transations table status, returned_by, return_date
    const updateDeviceCurrentState = "UPDATE device_transactions SET status=$1, returned_by=$2, return_date=NOW() WHERE device_serial_number=$3 AND user_id = $4";
    const deviceState = await query(updateDeviceCurrentState, [status, returned_by, device.serial_no, device.current_user_id]);

    if (deviceState.rowCount === 0) {
      return res.status(400).json({ message: "Device transaction not updated", error: true });
    }

    //Update  device table status, current_user_id
    const updateDevice = "UPDATE devices SET status=$1, current_user_id=$2, updated_at=NOW() WHERE id=$3";
    const VALUES = ["Available", null];

    const { rowCount } = await query(updateDevice, [...VALUES, id]);

    if (rowCount === 0) {
      return res.status(400).json({ message: "An error occured when releasing the device from user", error: true });
    }

    return res.status(200).json({ rowCount, message: `Device successfully released.`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//reject device
const rejectDeviceIssueLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Device Id not provided.", error: true });
    }

    if (!returned_by || !status) {
      return res.status(400).json({ message: "All fields must be provided.", error: true });
    }

    //Verify Device
    const verifyDevice = `SELECT * FROM devices WHERE id = $1`;
    const { rows } = await query(verifyDevice, [id]);

    if (!rows) {
      return res.status(400).json({ message: "Device matching the id not found", error: true });
    }

    const device = rows[0];

    //Update  transations table status, returned_by, return_date
    const updateDeviceCurrentState = "UPDATE device_transactions SET status=$1, WHERE device_serial_number=$2 AND user_id = $3";
    const deviceState = await query(updateDeviceCurrentState, [status, device.serial_no, device.current_user_id]);

    if (deviceState.rowCount === 0) {
      return res.status(400).json({ message: "Device transaction not updated", error: true });
    }

    //Update  device table status, current_user_id
    const updateDevice = "UPDATE devices SET status=$1, current_user_id=$2, updated_at=NOW() WHERE id=$3";
    const VALUES = ["Available", null];

    const { rowCount } = await query(updateDevice, [...VALUES, id]);

    if (rowCount === 0) {
      return res.status(400).json({ message: "An error occured when releasing the device from user", error: true });
    }

    return res.status(200).json({ rowCount, message: `Device successfully released.`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//approve device
const approveDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { approved_by, status, deviceTransactionId } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Device Id not provided.", error: true });
    }

    if (!approved_by || !status || !deviceTransactionId) {
      return res.status(400).json({ message: "All fields must be provided.", error: true });
    }

    //Verify Device
    const verifyDevice = `SELECT * FROM devices WHERE id = $1`;
    const { rows } = await query(verifyDevice, [id]);

    if (!rows) {
      return res.status(400).json({ message: "Device matching the id not found", error: true });
    }

    const device = rows[0];

    //Update  transations table status, returned_by, return_date
    const updateDeviceCurrentState = "UPDATE device_transactions SET status=$1, approved_by=$2, approve_date=NOW() WHERE id=$3 ";
    const deviceState = await query(updateDeviceCurrentState, [status, approved_by, deviceTransactionId]);

    if (deviceState.rowCount === 0) {
      return res.status(400).json({ message: "Device transaction not updated", error: true });
    }

    //Update  device table status
    const updateDevice = "UPDATE devices SET status=$1, updated_at=NOW() WHERE id=$2";
    const { rowCount } = await query(updateDevice, [status, id]);

    if (rowCount === 0) {
      return res.status(400).json({ message: "An error occured when releasing the device from user", error: true });
    }

    return res.status(200).json({ rowCount, message: `Device successfully ${device.status === "Loan Approval required" ? "loaned" : "assigned"}.`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Soft delete device
const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_deleted, deleted_by, status } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Device Id must be provided", error: true });
    }

    //Verify if exist
    const find_device_query = "SELECT * FROM devices WHERE id = $1";
    const { rowCount, rows } = await query(find_device_query, [id]);

    if (rowCount === 0) {
      return res.status(400).json({ message: "Device matching Id not found", error: true });
    }

    if (rows[0].current_user_id) {
      return res.status(400).json({ message: "Operation failed, this is device is currently assigned to a user.", error: true });
    }

    //Update  device table status
    const setAsDeleted = "UPDATE devices SET is_deleted=$1, deleted_at=NOW(), deleted_by=$2, status=$3, updated_at=NOW() WHERE id=$4";
    await query(setAsDeleted, [is_deleted, deleted_by, status, id]);

    if (rowCount === 0) {
      return res.status(400).json({ message: "An error occured when releasing the device from user", error: true });
    }

    return res.status(200).json({ message: "Device deleted successfully", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = {
  getAllDevices,
  getDeviceDueUpgrade,
  getDeviceForApproval,
  getLoanedDevices,
  getDevicesDueReturn,
  getDevicesStats,
  getDevice,
  getDeviceDetails,
  getDevicesAssigned,
  createDevice,
  deleteDevice,
  updateDevice,
  bulkCreateDevice,
  assignDevice,
  loanDevice,
  releaseDevice,
  approveDevice,
};
