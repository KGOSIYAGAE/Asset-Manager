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
    const { assetTag, make, model, serial_no, spec, category, condition, status, warrantyExpiration, location, supplier, invoice_no, purchaseValue, purchaseDate, loanStartDate, loanEndDate } =
      req.body;

    if (
      !assetTag ||
      !make ||
      !model ||
      !serial_no ||
      !spec ||
      !category ||
      !condition ||
      !status ||
      !warrantyExpiration ||
      !location ||
      !supplier ||
      !invoice_no ||
      !purchaseValue ||
      !purchaseDate ||
      !loanStartDate ||
      !loanEndDate
    ) {
      return res.status(400).json({ message: "All fields must be provided.", error: true });
    }

    const values = [assetTag, make, model, serial_no, spec, category, condition, status, warrantyExpiration, location, supplier, invoice_no, purchaseValue, purchaseDate, loanStartDate, loanEndDate];

    const addDeviceQuery =
      "INSERT INTO `devices`(`id`, `assetTag`, `serial_no`, `make`, `model`, `category`, `deviceCondition`, `status`, `specification`, `supplier`, `invoice_no`, `purchaseValue`, `purchaseDate`, `assignedTo`, `userId`, `location`, `loanStartDate`, `loanEndDate`, `createdAt`) VALUES (?)";

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

module.exports = { getAllDevices, getDevice, addDevice };
