const { query } = require("../util/pg_dbConnection");
const format = require("pg-format");
const { createNewLog } = require("./deviceLogController");

//Get all devices
const getAllDevices = async (req, res) => {
  try {
    const GET_ALL_QUERY = "SELECT * FROM devices ORDER BY date_issued ASC";

    const { rows } = await query(GET_ALL_QUERY);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    return res.status(200).json({ deviceList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get all devices
const getDeviceLoanDue = async (req, res) => {
  try {
    const GET_ALL_QUERY = `SELECT * FROM "deviceUserDetails" WHERE loan_end_date < CURRENT_DATE`;

    const { rows } = await query(GET_ALL_QUERY);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    return res.status(200).json({ deviceList: rows, message: "Success", error: false });
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

//Create device
const createDevice = async (req, res) => {
  try {
    const { assetTag, make, model, serial_no, spec, category, device_condition, status, warranty_end_date, invoice_id, purchaseValue, currentValue } = req.body;

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
    if (!invoice_id) {
      return res.status(400).json({ message: "Invoice id is required!" });
    }
    if (!purchaseValue) {
      return res.status(400).json({ message: "Purchase value is required!" });
    }
    if (!currentValue) {
      return res.status(400).json({ message: "Current value is required!" });
    }

    const create_device_query =
      "INSERT INTO devices(make, model, category, device_condition, status, asset_tag, serial_no, specification, warranty_end_date, purchase_price, value_price, invoice_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);";
    const VALUES = [make, model, category, device_condition, status, assetTag, serial_no, spec, warranty_end_date, purchaseValue, currentValue, invoice_id];

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
      device.spec,
      device.warranty_end_date,
      device.purchaseValue,
      device.currentValue,
      device.invoice_id,
    ]);

    const bulk_create_device_query = format(
      "INSERT INTO devices (make, model, category, device_condition, status, asset_tag, serial_no, specification, warranty_end_date, purchase_price, value_price, invoice_id) VALUES %L",
      VALUES
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

//Update device
const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Device Id is required!", error: true });
    }

    const { assetTag, make, model, serial_no, spec, category, device_condition, status, warranty_end_date, invoice_id, purchaseValue, currentValue } = req.body;

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
    if (!invoice_id) {
      return res.status(400).json({ message: "Invoice id is required!", error: true });
    }
    if (!purchaseValue) {
      return res.status(400).json({ message: "Purchase value is required!", error: true });
    }
    if (!currentValue) {
      return res.status(400).json({ message: "Current value is required!", error: true });
    }

    const update_device_query =
      "UPDATE devices SET make=$1, model=$2, category=$3, device_condition=$4, status=$5, asset_tag=$6, serial_no=$7, specification=$8, warranty_end_date=$9, purchase_price=$10, value_price=$11, invoice_id=$12 WHERE id =$13 ;";
    const VALUES = [make, model, category, device_condition, status, assetTag, serial_no, spec, warranty_end_date, purchaseValue, currentValue, invoice_id];

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

//Assign device
const assignDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, status, userId, date_issued } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Device Id not provided.", error: true });
    }

    if (!status || !userId || !date_issued) {
      return res.status(400).json({ message: "All fields must be provided.", error: true });
    }

    const assignDeviceQuery = "UPDATE devices SET status=$1, user_id=$2, date_issued=$3 WHERE id=$4";
    const VALUES = [status, userId, date_issued];

    const { rowCount } = await query(assignDeviceQuery, [...VALUES, id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when assigning the device", error: true });
    }

    //Create new log
    createNewLog("Assign", req.user, id, `Device successfully assigned to ${fullName}`);

    return res.status(200).json({ rowCount, message: `Device successfully assigned to ${fullName}`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Assign device
const releaseDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, userId, return_date } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Device Id not provided.", error: true });
    }

    if (!status || !userId || !return_date) {
      return res.status(400).json({ message: "All fields must be provided.fff", error: true });
    }

    const assignDeviceQuery = "UPDATE devices SET status=$1, user_id=$2, return_date=$3 WHERE id=$4";
    const VALUES = [status, userId, return_date];

    const { rowCount } = await query(assignDeviceQuery, [...VALUES, id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when releasing the device from user", error: true });
    }

    //Create new log
    createNewLog("Release", req.user, id, `Device successfully released from previous user.`);

    return res.status(200).json({ rowCount, message: `Device successfully released from previous user.`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Delete device
const deleteDevice = async (req, res) => {
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
};

module.exports = { getAllDevices, getDeviceLoanDue, getDevice, getDeviceDetails, createDevice, deleteDevice, updateDevice, bulkCreateDevice, assignDevice, releaseDevice };
