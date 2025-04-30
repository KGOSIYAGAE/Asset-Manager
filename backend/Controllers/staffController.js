const { query } = require("../util/pg_dbConnection");
const format = require("pg-format");

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
    const { name, surname, phone_number, email, staff_no, position_id, department_id, contract_type, isActive, start_date, endDate } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name required", error: true });
    }
    if (!surname) {
      return res.status(400).json({ message: "Surname is required", error: true });
    }
    if (!phone_number) {
      return res.status(400).json({ message: "Phone number is required", error: true });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required", error: true });
    }
    if (!staff_no) {
      return res.status(400).json({ message: "Staff number is required", error: true });
    }
    if (!position_id) {
      return res.status(400).json({ message: "Position is required", error: true });
    }
    if (!department_id) {
      return res.status(400).json({ message: "Department is required", error: true });
    }
    if (!contract_type) {
      return res.status(400).json({ message: "Contract type is required", error: true });
    }
    if (!isActive) {
      return res.status(400).json({ message: "User status is required", error: true });
    }
    if (!start_date) {
      return res.status(400).json({ message: "Start date is required", error: true });
    }
    if (!endDate) {
      return res.status(400).json({ message: "End date is required", error: true });
    }

    const create_staff_query =
      "INSERT INTO staff(name, surname, phone_number, email, staff_no, contract_type, acc_status, position_id, department_id, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
    const VALUES = [name, surname, phone_number, email, staff_no, contract_type, isActive, position_id, department_id, start_date, endDate];

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
    const { staff } = req.body;

    if (!Array.isArray(staff || staff.length === 0)) {
      return res.status(400).json({ message: "Invalid or empty student list", error: true });
    }

    const VALUES = staff.map((staff) => [
      staff.name,
      staff.surname,
      staff.phone_number,
      staff.email,
      staff.staff_no,
      staff.contract_type,
      staff.position_id,
      staff.department_id,
      staff.isActive,
      staff.start_date,
      staff.endDate,
    ]);

    const bulk_create_staff_query = format(
      "INSERT INTO staff (name, surname, phone_number, email, staff_no, contract_type, position_id,department_id, acc_status, start_date, end_date) VALUES %L",
      VALUES
    );

    const { rowCount } = await query(bulk_create_staff_query);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when adding staff", error: true });
    }

    return res.status(200).json({ rowCount, message: `${rowCount} staff successfully created.`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Create staff
const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User Id required", error: true });
    }

    const { name, surname, phone_number, email, staff_no, position_id, department_id, contract_type, isActive, start_date, endDate } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name required", error: true });
    }
    if (!surname) {
      return res.status(400).json({ message: "Surname is required", error: true });
    }
    if (!phone_number) {
      return res.status(400).json({ message: "Phone number is required", error: true });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required", error: true });
    }
    if (!staff_no) {
      return res.status(400).json({ message: "Staff number is required", error: true });
    }
    if (!position_id) {
      return res.status(400).json({ message: "Position is required", error: true });
    }
    if (!department_id) {
      return res.status(400).json({ message: "Department is required", error: true });
    }
    if (!contract_type) {
      return res.status(400).json({ message: "Contract type is required", error: true });
    }
    if (!isActive) {
      return res.status(400).json({ message: "User status is required", error: true });
    }
    if (!start_date) {
      return res.status(400).json({ message: "Start date is required", error: true });
    }
    if (!endDate) {
      return res.status(400).json({ message: "End date is required", error: true });
    }

    const update_staff_query =
      "UPDATE staff SET name=$1, surname=$2, phone_number=$3, email=$4, staff_no=$5, contract_type=$6, acc_status=$7, position_id=$8, department_id=$9, start_date=$10, end_date=$11 WHERE id = $12";
    const VALUES = [name, surname, phone_number, email, staff_no, contract_type, isActive, position_id, department_id, start_date, endDate];

    const { rowCount } = await query(update_staff_query, [...VALUES, id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured updating staff.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Staff successfully updated", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Delete staff
const deleteStaff = async (req, res) => {
  try {
    const { staff_no } = req.params;

    if (!staff_no) {
      return res.status(400).json({ message: "Staff number must be provided", error: true });
    }

    const deleteStaffQuery = "DELETE FROM staff WHERE staff_no = $1";

    const { rowCount } = await query(deleteStaffQuery, [staff_no]);

    return res.status(200).json({ message: "Staff member deleted successfully", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { getAllStaff, getStaff, createStaff, bulkCreateStaff, updateStaff, deleteStaff };
