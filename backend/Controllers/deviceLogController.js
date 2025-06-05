const { query } = require("../util/pg_dbConnection");

//device log
const createNewLog = async (action, crested_by, item_id, description) => {
  try {
    const INSERT_LOG = "INSERT INTO device_log (action, description, item_id, created_by) VALUES ($1,$2,$3,$4);";

    const values = [action, description, item_id, crested_by];

    const { rowCount, rows } = await query(INSERT_LOG, [...values]);

    if (rowCount <= 0) {
      return console.log("Error occured creating new log entry to table");
    }
    return console.log(`New log entry: ${description}`);
  } catch (error) {
    return console.log(error);
  }
};

const getAllLogs = async (req, res) => {
  try {
    const getAllLogs = `SELECT * FROM "deviceLogDetails" ORDER BY id DESC LIMIT 10`;

    const { rowCount, rows } = await query(getAllLogs);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "No logs found", error: true });
    }

    return res.status(200).json({ rowCount, deviceLogList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

const getAllLatestDevicesLogs = async (req, res) => {
  try {
    const getAllLogs = `SELECT * FROM public.device_log WHERE description LIKE '%Device%' ORDER BY created_at DESC LIMIT 10;`;

    const { rowCount, rows } = await query(getAllLogs);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "No logs found", error: true });
    }

    return res.status(200).json({ rowCount, deviceLogList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//SELECT * FROM public.device_log WHERE description LIKE '%Device%' ORDER BY created_at DESC LIMIT 5;

const getAlllogsForDevice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Device id not provided", error: true });
    }

    const getAllLogs = `SELECT * FROM "deviceLogDetails"  WHERE item_id = $1 ORDER BY id DESC`;

    const { rowCount, rows } = await query(getAllLogs, [id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "No logs found", error: true });
    }

    return res.status(200).json({ rowCount, deviceLogList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { createNewLog, getAllLogs, getAlllogsForDevice, getAllLatestDevicesLogs };
