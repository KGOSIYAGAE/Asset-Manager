const { query } = require("../util/pg_dbConnection");
const format = require("pg-format");
const { createNewLog } = require("./deviceTransactionsController");
const { sendApprovalEmail, sendApprovedEmail, sendRejectionEmail } = require("./notificationsController");

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
      "INSERT INTO devices(make, model, category, device_condition, status, asset_tag, serial_no, specification, warranty_end_date, purchase_price, value_price, supplier_name, invoice_number, device_type,operational_state,created_at,is_deleted) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,'Normal', NOW(),FALSE);";
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

/*Get devices stats
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
};*/

//Get devices stats
const getDevicesStats = async (req, res) => {
  try {
    //1. Overall summary counts
    const devicesOverallSummaryQuery = `SELECT
    COUNT(*) AS total_devices,
    COUNT(*) FILTER (WHERE is_deleted = false OR is_deleted IS NULL) AS active_devices,
    COUNT(*) FILTER (WHERE is_deleted = true) AS deleted_devices,
    COUNT(DISTINCT make) AS distinct_makes,
    COUNT(DISTINCT model) AS distinct_models,
    COUNT(DISTINCT category) AS distinct_categories
    FROM devices;`;

    const devicesOverallSummaryResponse = await query(devicesOverallSummaryQuery);
    const devicesOverallSummary = devicesOverallSummaryResponse.rows;

    if (!devicesOverallSummary) {
      return res.status(400).json({ message: "Device Summary not found", error: true });
    }

    //2. Devices grouped by make and model
    const devicesByMakeModelQuery = `SELECT
    make,
    model,
    COUNT(*) AS total_units
    FROM devices
    WHERE is_deleted = false OR is_deleted IS NULL
    GROUP BY make, model
    ORDER BY make, total_units DESC;`;

    const devicesByMakeModelResponse = await query(devicesByMakeModelQuery);
    const devicesByMakeModel = devicesByMakeModelResponse.rows;

    if (!devicesByMakeModel) {
      return res.status(400).json({ message: "Device grouped by Make & Model not found", error: true });
    }

    //3. Devices by status (e.g. issued, available, etc.)
    const devicesByStatusQuery = `SELECT
            status,
            COUNT(*) AS total
            FROM devices
            WHERE is_deleted = false OR is_deleted IS NULL
            GROUP BY status
            ORDER BY total DESC;`;

    const devicesByStatusResponse = await query(devicesByStatusQuery);
    const devicesByStatus = devicesByStatusResponse.rows;

    if (!devicesByStatus) {
      return res.status(400).json({ message: "Device grouped by status not found", error: true });
    }

    /* -- 4. Issued vs Available breakdown (adjust status values to match your actual data)
SELECT
    count(*) FILTER (WHERE status::text = 'Assigned'::text) AS assigned_devices,
    count(*) FILTER (WHERE status::text = 'Available'::text) AS available_devices,
    count(*) FILTER (WHERE status::text = 'Loaned'::text) AS loaned_devices,
    count(*) FILTER (WHERE status::text = 'Reserved for staff'::text) AS reserved_staff_devices,
    count(*) FILTER (WHERE status::text = 'Reserved for students'::text) AS reserved_students_devices,
	count(*) FILTER (WHERE status::text = 'Stolen'::text) AS stolen_devices,
    count(*) FILTER (WHERE status::text = 'Sold'::text) AS sold_devices,
    count(*) FILTER (WHERE status::text = 'Disposed'::text) AS disposed_devices,
    count(*) FILTER (WHERE status::text = 'Retired'::text) AS retired_devices,
    count(*) FILTER (WHERE status::text = 'Written Off'::text) AS writen_off_devices
FROM devices
WHERE is_deleted = false OR is_deleted IS NULL;
    */

    //5. Devices by category
    const devicesByCategoryQuery = `SELECT
    category,
    COUNT(*) AS total
    FROM devices
    WHERE is_deleted = false OR is_deleted IS NULL
    GROUP BY category
    ORDER BY total DESC;`;

    const devicesByCategorysResponse = await query(devicesByCategoryQuery);
    const devicesByCategory = devicesByCategorysResponse.rows;

    if (!devicesByCategory) {
      return res.status(400).json({ message: "Device grouped by category not found", error: true });
    }

    //6. Devices by condition (new, used, damaged, etc.)
    const devicesByConditionQuery = `SELECT
    device_condition,
    COUNT(*) AS total
    FROM devices
    WHERE is_deleted = false OR is_deleted IS NULL
    GROUP BY device_condition
    ORDER BY total DESC;`;

    const devicesByConditionResponse = await query(devicesByConditionQuery);
    const devicesByCondition = devicesByConditionResponse.rows;

    if (!devicesByCondition) {
      return res.status(400).json({ message: "Device grouped by condition not found", error: true });
    }

    //7. Devices by operational state
    const devicesByOperationalQuery = `SELECT
    operational_state,
    COUNT(*) AS total
    FROM devices
    WHERE is_deleted = false OR is_deleted IS NULL
    GROUP BY operational_state
    ORDER BY total DESC;`;

    const devicesByOperationalResponse = await query(devicesByOperationalQuery);
    const devicesByOperational = devicesByOperationalResponse.rows;

    if (!devicesByOperational) {
      return res.status(400).json({ message: "Device grouped by operational state not found", error: true });
    }

    //8. Cross-tab: make + status (how many of each make are issued vs available)
    const devicesMakeModelStatusCountQuery = `SELECT
    make,
    model,
    status,
    COUNT(*) AS total
    FROM devices
    WHERE is_deleted = false OR is_deleted IS NULL
    GROUP BY make,model, status
    ORDER BY make,model, status;`;

    const devicesMakeModelStatusCountResponse = await query(devicesMakeModelStatusCountQuery);
    const devicesMakeModelStatusCount = devicesMakeModelStatusCountResponse.rows;

    if (!devicesMakeModelStatusCount) {
      return res.status(400).json({ message: "Device grouped by Make Model Status count not found", error: true });
    }

    //9. Devices with warranty expired (within the last 60 days) or expiring within the next 60 days
    const devicesWarrantyStatsQuery = `SELECT 
    make, 
    model, 
    asset_tag, 
    serial_no, 
    warranty_end_date,
    CASE 
    WHEN warranty_end_date < CURRENT_DATE THEN 'Expired'
    ELSE 'Expiring Soon'
    END AS warranty_status,
    CASE 
    WHEN warranty_end_date < CURRENT_DATE 
    THEN (CURRENT_DATE - warranty_end_date)   -- days past expiry
    ELSE (warranty_end_date - CURRENT_DATE)        -- days until expiry
    END AS days_diff,
    CASE 
    WHEN warranty_end_date < CURRENT_DATE 
    THEN (CURRENT_DATE - warranty_end_date) || ' days ago'
    ELSE (warranty_end_date - CURRENT_DATE) || ' days remaining'
    END AS days_diff_label
    FROM devices
    WHERE warranty_end_date BETWEEN CURRENT_DATE - INTERVAL '5 days' 
    AND CURRENT_DATE + INTERVAL '60 days'
    AND (is_deleted = false OR is_deleted IS NULL)
    ORDER BY warranty_end_date LIMIT 10;`;

    const devicesWarrantyStatsResponse = await query(devicesWarrantyStatsQuery);
    const devicesWarrantyStats = devicesWarrantyStatsResponse.rows;

    if (!devicesWarrantyStats) {
      return res.status(400).json({ message: "Device warranty stats not found", error: true });
    }

    //10. Summary counts of issued/loaned devices by staff vs student
    const deviceAssignedLoanedByUserQuery = `SELECT
    COUNT(*) FILTER (WHERE status = 'Assigned' AND length(current_user_id::text) > 6) AS issued_to_students,
    COUNT(*) FILTER (WHERE status = 'Assigned' AND length(current_user_id::text) <= 6) AS issued_to_staff,
    COUNT(*) FILTER (WHERE status = 'Loaned' AND length(current_user_id::text) > 6) AS loaned_to_students,
    COUNT(*) FILTER (WHERE status = 'Loaned' AND length(current_user_id::text) <= 6) AS loaned_to_staff,
    COUNT(*) FILTER (WHERE current_user_id IS NULL AND status IN ('Assigned', 'Loaned')) AS assigned_but_no_user_id
    FROM devices
    WHERE (is_deleted = false OR is_deleted IS NULL);`;

    const deviceAssignedLoanedByUserResponse = await query(deviceAssignedLoanedByUserQuery);
    const deviceAssignedLoanedByUser = deviceAssignedLoanedByUserResponse.rows;

    if (!deviceAssignedLoanedByUser) {
      return res.status(400).json({ message: "Device Assigned / Loaned users stats not found", error: true });
    }

    return res.status(200).json({
      stats: {
        devicesOverallSummary,
        devicesByMakeModel,
        devicesByStatus,
        devicesByCategory,
        devicesByCondition,
        devicesByOperational,
        devicesMakeModelStatusCount,
        devicesWarrantyStats,
        deviceAssignedLoanedByUser,
      },
      message: "Success",
      error: false,
    });
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
    const { userrole } = req.query;

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

    console.log(issued_by);

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

    //await sendApprovalNotification(device.serial_no, device.make, device.model, device.category, device.device_type, userId, issued_by);

    await sendApprovalEmail(device.serial_no, device.make, device.model, device.category, device.device_type, expected_return_date, userId, issued_by, res);

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
    const { rejected_by, status, deviceTransactionId, rejectReason } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Device Id not provided.", error: true });
    }

    if (!rejectReason || !status) {
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
    const updateDeviceCurrentState = "UPDATE device_transactions SET status=$1 WHERE device_serial_number=$2 AND user_id = $3";
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

    //Send Rejection Email Email
    const emailSent = await sendRejectionEmail(rejected_by, deviceTransactionId, device, rejectReason, res);

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

    //Send Approved Email
    const emailSent = await sendApprovedEmail(approved_by, deviceTransactionId, device, res);

    if (emailSent) {
      return res.status(200).json({ rowCount, message: `Device successfully ${device.status === "Loan Approval required" ? "loaned" : "assigned"}.`, error: false });
    }
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
  rejectDeviceIssueLoan,
  approveDevice,
};
