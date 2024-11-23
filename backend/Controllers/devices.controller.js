const { dbConnection } = require("../dbConnection");

//Get All Devices
const getAllDevices = async (req, res) => {
  try {
    const getAllQuery = "SELECT * FROM devices";

    dbConnection.query(getAllQuery, (error, results) => {
      if (error) {
        return res.status(400).json({ message: "No devices found", error: true });
      }
      return res.status(200).json({ deviceList: results, message: "Devices fetched successfully", error: false });
    });
  } catch (error) {
    return res.status(400).json({ message: "Internal server error", error: true });
  }
};

//Get Device
const getDevice = async (req, res) => {
  const { serial_no } = req.params;

  if (!serial_no) {
    return res.status(400).json({ message: "Serial number not provided", error: true });
  }

  try {
    const getDeviceQuery = "SELECT * FROM devices WHERE serial_no = ?";

    dbConnection.query(getDeviceQuery, serial_no, (error, results) => {
      if (error) {
        return res.status(400).json({ message: "Device not found", error: true });
      }
      return res.status(200).json({ deviceDetails: results, message: "Device found successfully", error: false });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: true });
  }
};

//Add device
const addDevice = async (req, res) => {
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
      return res.status(400).json({ message: "All fields must be provided.", error: true });
    }

    const values = [
      assetTag,
      serial_no,
      make,
      model,
      category,
      device_condition,
      status,
      warrantyExpiration,
      spec,
      supplier,
      invoice_no,
      purchaseValue,
      purchaseDate,
      location,
      loanStartDate,
      loanEndDate,
    ];
    const addDeviceQuery =
      "INSERT INTO `devices`(`assetTag`, `serial_no`, `make`, `model`, `category`, `device_condition`,`status`, `warrantyExpiration` ,`specification`, `supplier`, `invoice_no`, `purchaseValue`, `purchaseDate`, `location`, `loanStartDate`, `loanEndDate`) VALUES (?)";

    dbConnection.query(addDeviceQuery, [values], (error, results) => {
      if (error) {
        return res.status(400).json({ message: "Device already exists.", error: true });
      }
      return res.status(200).json({ message: "Device added successfully.", error: false });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error: true });
  }
};

//Update device
const updateDevice = async (req, res) => {
  try {
    const { serial_no } = req.params;
    const { assetTag, make, model, spec, category, device_condition, status, warrantyExpiration, location, supplier, invoice_no, purchaseValue, purchaseDate, loanStartDate, loanEndDate } = req.body;

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
      return res.status(400).json({ message: "All fields must be provided.", error: true });
    }

    const values = [
      assetTag,
      make,
      model,
      serial_no,
      spec,
      category,
      device_condition,
      status,
      warrantyExpiration,
      location,
      supplier,
      invoice_no,
      purchaseValue,
      purchaseDate,
      loanStartDate,
      loanEndDate,
    ];

    const updateDeviceQuery =
      "UPDATE `devices` SET `assetTag`=?,`serial_no`=?,`make`=?,`model`=?,`category`=?,`device_condition`=?,`status`=?,`specification`=?,`warrantyExpiration`=?,`supplier`=?,`invoice_no`=?,`purchaseValue`=?,`purchaseDate`=?,`assignedTo`=?,`userId`=?,`location`=?,`loanStartDate`=?',`loanEndDate`=? WHERE `serial_no1 = ?";

    dbConnection.query(updateDeviceQuery, [...values, serial_no], (error, results) => {
      if (error) {
        return res.status(400).json({ message: "An error occured when updating device", error: true });
      }
      return res.status(200).json({ message: "Device updated successfully", error: false });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: true });
  }
};

module.exports = { getAllDevices, getDevice, addDevice, updateDevice };
