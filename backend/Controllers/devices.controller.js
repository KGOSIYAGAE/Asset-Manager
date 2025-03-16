const { dbConnection } = require("../util/dbConnection");
const { createNewLog } = require("../util/Table.Logger");

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
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "device id not provided", error: true });
  }

  try {
    //const getDeviceQuery = "SELECT * FROM devices WHERE id = ?";
    const getDeviceQuery = `SELECT devices.id, devices.assetTag, devices.serial_no, devices.make, devices.model, devices.category, devices.device_condition, devices.status, devices.specification, devices.warrantyExpiration, devices.supplier,devices.invoice_no, devices.purchaseValue, devices.purchaseDate, devices.location, devices.loanStartDate, devices.loanEndDate, devices.createdAt, COALESCE(students.name, staff.name) AS first_name, COALESCE(students.surname, staff.surname) AS last_name, COALESCE(students.student_no, staff.staff_no) AS user_id FROM devices LEFT JOIN students ON (devices.userId = students.student_no )  LEFT JOIN staff ON (devices.userId = staff.staff_no) WHERE devices.id = ?`;

    dbConnection.query(getDeviceQuery, id, (error, results) => {
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

      //Create log
      createNewLog("create", req.user.values, serial_no, `New device successfully created ${serial_no}`);

      return res.status(200).json({ message: "Device added successfully.", error: false });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error: true });
  }
};

//Update device
const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;

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
      spec,
      warrantyExpiration,
      supplier,
      invoice_no,
      purchaseValue,
      purchaseDate,
      location,
      loanStartDate,
      loanEndDate,
    ];

    const updateDeviceQuery =
      "UPDATE `devices` SET `assetTag`=?,`serial_no`=?,`make`=?,`model`=?,`category`=?,`device_condition`=?,`status`=?,`specification`=?,`warrantyExpiration`=?,`supplier`=?,`invoice_no`=?,`purchaseValue`=?,`purchaseDate`=?,`location`=?,`loanStartDate`=?,`loanEndDate`=? WHERE `id` = ?";

    dbConnection.query(updateDeviceQuery, [...values, id], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: "An error occured when updating device", error: true });
      }

      //Create log
      createNewLog("update", req.user.values, id, `Device successfully updated`);

      return res.status(200).json({ message: "Device updated successfully", error: false });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: true });
  }
};

//Assign device
const assignDevice = async (req, res) => {
  const { id } = req.params;
  const { status, location, loanStartDate, userId } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "Device Id not provided", error: true });
    }

    if (!status || !location || !loanStartDate || !userId) {
      return res.status(400).json({ message: "All details must be provided.", error: true });
    }

    const assignQuery = "UPDATE `devices` SET `status`=?,`location`=?,`loanStartDate`=?,`userId`=? WHERE `id`=?";
    const values = [status, location, loanStartDate, userId];

    dbConnection.query(assignQuery, [...values, id], (error, results) => {
      if (error) {
        return res.status(400).json({ message: "An error occured when assigning user", error: true });
      }

      //Create log
      createNewLog("assign", req.user.values, id, `Device successfully assigned to ${userId}`);

      return res.status(200).json({ results, message: "User assigned successfully.", error: false });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: true });
  }
};

//Delete device
const deleteDevice = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ message: "Device id must be provided.", error: true });
    }

    const deleteQuery = "DELETE FROM `devices` WHERE id = ?";
    dbConnection.query(deleteQuery, id, (error, results) => {
      if (error) {
        return res.status(400).json({ message: "Device not found", error: true });
      }
      //Create log
      createNewLog("delete", req.user.values, id, "Device deleted successfully.");

      return res.status(200).json({ message: "Device deleted successfully.", error: false });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error: true });
  }
};

module.exports = { getAllDevices, getDevice, addDevice, updateDevice, assignDevice, deleteDevice };
