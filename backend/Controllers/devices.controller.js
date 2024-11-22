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

module.exports = { getAllDevices };
