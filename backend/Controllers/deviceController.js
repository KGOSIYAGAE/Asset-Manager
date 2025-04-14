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

module.exports = { getAllDevices };
