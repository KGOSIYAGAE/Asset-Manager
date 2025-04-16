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
/*
const createDevice = async (req, res) => {
  try {
    const { assetTag, make, model, serial_no, spec, category, device_condition, status, warrantyExpiration, location, supplier, invoice_no, purchaseValue, purchaseDate, loanStartDate, loanEndDate } =
      req.body;

    if (
      !assetTag ||
      !make ||
      !model ||
      !serial_no ||
      !spec ||
      !category ||
      !device_condition ||
      !status ||
      !warrantyExpiration ||
      !location ||
      !supplier ||
      !invoice_no ||
      !purchaseValue ||
      !purchaseDate
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const create_device_query = "INSERT INTO devices(make, model, category, device_condition, status, asset_tag, serial_no, specification, date_issued, return_date, warranty_end_date, purchase_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};*/

module.exports = { getAllDevices, getDevice };
