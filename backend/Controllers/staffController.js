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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    //Get total device that need approval
    const countQuery = `SELECT COUNT(*) AS total FROM staff WHERE is_deleted = FALSE`;

    const dataQuery = "SELECT * FROM staff WHERE is_deleted = FALSE LIMIT $1 OFFSET $2 ";

    //Get device count
    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    const totalStaff = countResponse.rows[0].total;
    const totalPages = Math.ceil(totalStaff / limit);

    const { rows } = await query(dataQuery, [limit, offset]);

    //const { rowCount, rows } = await query(all_staff_query);

    return res.status(200).json({ totalPages: totalPages, staffData: rows, message: "Success", error: false });
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

    const get_staff_query = `SELECT * FROM "StaffDetails" WHERE id = $1`;

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

//Get staff by id
const getSupportAdmins = async (req, res) => {
  try {
    const userrole = "support_admin";

    const get_staff_query = `SELECT * FROM staff WHERE userrole = $1`;

    const { rowCount, rows } = await query(get_staff_query, [userrole]);

    if (rowCount <= 0) {
      return res.status(200).json({ rowCount, message: "Staff matching userrole not found", error: false });
    }

    return res.status(200).json({ staffData: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get staff by staff_no
const getStaffDetails = async (req, res) => {
  try {
    const { staff_no } = req.params;

    if (!staff_no) {
      return res.status(200).json({ message: "Staff number required", error: true });
    }

    const get_staff_query = `SELECT * FROM "StaffDetails" WHERE staff_no = $1`;

    const { rowCount, rows } = await query(get_staff_query, [staff_no]);

    if (rowCount <= 0) {
      return res.status(200).json({ rowCount, message: "Staff matching staff no not found", error: false });
    }

    return res.status(200).json({ staffData: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error.stack || error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Create staff
const createStaff = async (req, res) => {
  try {
    console.log(req.body);
    const { name, surname, phone_number, email, staff_no, faculty_name, position_name, department_name, contract_type, isActive, start_date, endDate } = req.body;

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
    if (!faculty_name) {
      return res.status(400).json({ message: "Faculty is required", error: true });
    }
    if (!position_name) {
      return res.status(400).json({ message: "Position is required", error: true });
    }
    if (!department_name) {
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

    const create_staff_query =
      "INSERT INTO staff(name, surname, phone_number, email, staff_no, contract_type, acc_status, faculty_name, position_name, department_name, start_date, end_date,created_at, updated_at, is_deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,  $12, NOW(), NOW(),'FALSE')";
    const VALUES = [name, surname, phone_number, email, staff_no, contract_type, isActive, faculty_name, position_name, department_name, start_date, endDate];

    //Check if user exist
    checkStaffExist(staff_no, res);

    const { rowCount } = await query(create_staff_query, [...VALUES]);

    if (rowCount <= 0) {
      console.log("errpr creating");
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
      staff.staff_no,
      staff.name,
      staff.surname,
      staff.start_date,
      staff.email,
      staff.phone_number,
      staff.contract_type,
      staff.position_name,
      staff.faculty_name,
      staff.department_name,
      staff.isActive,
      staff.endDate,
    ]);

    const bulk_create_staff_query = format(
      "INSERT INTO staff (staff_no,name, surname, start_date, email, phone_number, contract_type, position_name,faculty_name, department_name, acc_status, end_date) VALUES %L",
      VALUES,
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

//Update staff
const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User Id required", error: true });
    }

    const { name, surname, phone_number, email, staff_no, faculty_name, position_name, department_name, contract_type, isActive, start_date, endDate } = req.body;

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

    if (!faculty_name) {
      return res.status(400).json({ message: "Faculty is required", error: true });
    }
    if (!position_name) {
      return res.status(400).json({ message: "Position is required", error: true });
    }
    if (!department_name) {
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

    const update_staff_query =
      "UPDATE staff SET name=$1, surname=$2, phone_number=$3, email=$4, staff_no=$5, contract_type=$6, acc_status=$7, faculty_name=$8, position_name=$9, department_name=$10, start_date=$11, end_date=$12, updated_at=NOW() WHERE id = $13";
    const VALUES = [name, surname, phone_number, email, staff_no, contract_type, isActive, faculty_name, position_name, department_name, start_date, endDate];

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
    const { is_deleted, deleted_by, acc_status } = req.body;

    if (!staff_no) {
      return res.status(400).json({ message: "Staff number must be provided", error: true });
    }

    //verify if exist

    const find_staff_query = `SELECT * FROM staff WHERE staff_no = $1`;
    const { rows } = await query(find_staff_query, [staff_no]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Staff member matching the staff no not found", error: true });
    }

    //Verify if user has any active devices
    const find_device_query = "SELECT * FROM devices WHERE current_user_id = $1";
    const device_repsonse = await query(find_device_query, [staff_no]);

    if (device_repsonse.rows.length > 0) {
      return res.status(400).json({ message: "Operation failed, this user currently has a device assigned to them.", error: true });
    }

    const deleteStaffQuery = "UPDATE staff SET is_deleted=$1, deleted_at=NOW(), deleted_by=$2, acc_status=$3, updated_at=NOW() WHERE staff_no = $4";

    await query(deleteStaffQuery, [is_deleted, deleted_by, acc_status, staff_no]);

    return res.status(200).json({ message: "Staff member deleted successfully", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get staff stats
const getStaffStats = async (req, res) => {
  try {
    const getStatsQuery = `SELECT * FROM "staffStats";`;

    const { rows } = await query(getStatsQuery);

    if (!rows) {
      return res.status(400).json({ message: "Staff stats not found", error: true });
    }

    return res.status(200).json({ staffDetails: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { getAllStaff, getStaff, getSupportAdmins, getStaffDetails, createStaff, bulkCreateStaff, updateStaff, deleteStaff, getStaffStats };
