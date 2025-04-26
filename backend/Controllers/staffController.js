const { query } = require("../util/pg_dbConnection");
//Check if staff exist
const checkStaffExist = async (staff_no, res) => {
  const checkStaffQuery = "SELECT * FROM staff WHERE staff_no = $1";

  const { rowCount } = await query(checkStaffQuery, [staff_no]);

  if (rowCount > 0) {
    return res.status(400).json({ message: "Staff memeber already exists", error: true });
  }
};

//Get all staff
const getAllStaff = async (req, res) => {
  try {
    const all_staff_query = "SELECT * FROM staff";

    const { rowCount, rows } = await query(all_staff_query);

    return res.status(200).json({ rowCount, staffData: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get staff by id
const getStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(200).json({ message: "Staff Id required", error: true });
    }

    const get_staff_query = "SELECT * FROM staff WHERE id = $1";

    const { rowCount, rows } = await query(get_staff_query, [id]);

    if (rowCount <= 0) {
      return res.status(200).json({ rowCount, message: "Staff matching Id not found", error: false });
    }

    return res.status(200).json({ staffData: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Create staff
const createStaff = async (req, res) => {
  try {
    const { name, surname, phone_number, email, staff_no, position_id, contract_type, isActive, start_date, end_date } = req.body;

    if (!name || !surname || !phone_number || !email || !staff_no || !position_id || !contract_type || !isActive || !start_date || !end_date) {
      return res.status(400).json({ message: "All fields are required", error: true });
    }

    const create_staff_query =
      "INSERT INTO staff(name, surname, phone_number, email, staff_no, contract_type, acc_status, position_id, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    const VALUES = [name, surname, phone_number, email, staff_no, contract_type, isActive, position_id, start_date, end_date];

    //Check if user exist
    checkStaffExist(staff_no, res);

    const { rowCount } = await query(create_staff_query, [...VALUES]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured creating staff.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Staff successfully created", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Bulk create staff
const bulkCreateStaff = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { getAllStaff, getStaff, createStaff, bulkCreateStaff };
