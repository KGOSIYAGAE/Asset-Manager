const { query } = require("../util/pg_dbConnection");

//Get all devices
const getAllDevices = async (req, res) => {
  try {
    const GET_ALL_QUERY = "SELECT * FROM devices";

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

    const getDeviceQuery = "SELECT * FROM devices_invoices_suppliers WHERE id = $1";

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
      return res.status(400).json({ message: "Invoice number is required!" });
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

    return res.status(200).json({ rowCount, message: "Successfully created", error: false });
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      return res.status(400).json({ message: `Device already exist` });
    }
    return res.status(500).json({ message: `Internal server error: ${error}` });
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

    return res.status(200).json({ message: "Device deleted successfully", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { getAllDevices, getDevice, createDevice, deleteDevice };
