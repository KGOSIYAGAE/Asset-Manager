const { query } = require("../util/pg_dbConnection");

//device log
const createNewLog = async (action, created_by, item_id, description) => {
  try {
    const INSERT_LOG = "INSERT INTO device_log (action, description, item_id, created_by) VALUES ($1,$2,$3,$4);";

    const values = [action, description, item_id, created_by];

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
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

const getAllLatestDevicesTransactions = async (req, res) => {
  try {
    const getAllLogs = `SELECT * FROM device_transactions WHERE ORDER BY created_at DESC`;

    const { rowCount, rows } = await query(getAllLogs);

    /*if (rowCount <= 0) {
      return res.status(400).json({ message: "No logs found", error: true });
    }*/

    return res.status(200).json({ rowCount, deviceLogList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//SELECT * FROM public.device_log WHERE description LIKE '%Device%' ORDER BY created_at DESC LIMIT 5;

const getAllTransactionsForDevice = async (req, res) => {
  try {
    const { serial_no } = req.query;

    if (!serial_no) {
      return res.status(400).json({ message: "Device serial number not provided", error: true });
    }

    const getAllTransactions = `
    SELECT 
    device_transactions.id,
    device_transactions.user_id,
    device_transactions.issue_date,
    device_transactions.return_date,
    device_transactions.status,
    device_transactions.approve_date,
    device_transactions.expected_return_date,
    device_transactions.action_type,
    device_transactions.issue_date,
    concat(COALESCE(students.name, staff.name), ' ', COALESCE(students.surname, staff.surname)) AS user_full_name

    FROM device_transactions
    LEFT JOIN devices ON device_transactions.device_serial_number = devices.serial_no
    LEFT JOIN students ON device_transactions.user_id = students.student_number
    LEFT JOIN staff ON device_transactions.user_id = staff.staff_no
    WHERE device_transactions.device_serial_number = $1 ORDER BY return_date DESC;`;

    const { rowCount, rows } = await query(getAllTransactions, [serial_no]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "No logs found", error: true });
    }

    return res.status(200).json({ rowCount, transactionList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

const getAllTransactionsForUser = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ message: "User Id not provided", error: true });
    }

    const getAllTransactions = `SELECT * FROM device_transactions  WHERE user_id = $1`;

    const { rowCount, rows } = await query(getAllTransactions, [user_id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "No logs found", error: true });
    }

    let transactionSerialNumbers = rows.map((rowCount) => rowCount.device_serial_number);

    const queryText = `SELECT devices.id, 
    devices.asset_tag, 
    devices.serial_no,
    devices.make,
    devices.model,
    devices.category,
    devices.device_condition,
    devices.status,
    device_transactions.issue_date,
    device_transactions.return_date,
    device_transactions.status,
    device_transactions.approve_date,
    device_transactions.expected_return_date,
    device_transactions.action_type,
    device_transactions.issue_date,

    -- Staff details from the new join (Modify these column names to match your actual staff table)
    CONCAT(st_app.name,' ',st_app.surname) AS approved_by,
    CONCAT(st_issuer.name,' ',st_issuer.surname) AS issued_by,
    CONCAT(st_returner.name,' ',st_returner.surname) AS returned_by


    FROM device_transactions
    LEFT JOIN devices ON device_transactions.device_serial_number = devices.serial_no
    LEFT JOIN staff st_app ON device_transactions.approved_by = st_app.id
    LEFT JOIN staff st_issuer ON device_transactions.issued_by = st_issuer.id
    LEFT JOIN staff st_returner ON device_transactions.returned_by = st_returner.id
    WHERE device_transactions.device_serial_number = ANY($1) ORDER BY return_date DESC;`;

    const finalResult = await query(queryText, [transactionSerialNumbers]);
    return res.status(200).json({ rowCount, transactionHistory: finalResult.rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { createNewLog, getAllLogs, getAllTransactionsForDevice, getAllLatestDevicesTransactions, getAllTransactionsForUser };
