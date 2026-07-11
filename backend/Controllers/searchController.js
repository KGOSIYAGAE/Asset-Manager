const { query } = require("../util/pg_dbConnection");
const format = require("pg-format");

//Search
const search = async (req, res) => {
  try {
    const { tableName, userrole, searchQuery } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const offset = (page - 1) * limit;

    let dataQuery = null;

    if (tableName === "devices") {
      dataQuery = `SELECT * FROM "deviceDetails"
     WHERE  is_deleted = FALSE AND serial_no ILIKE '%' || $1 || '%' OR asset_tag  ILIKE '%' || $1 || '%' OR current_user_id::text ILIKE '%' || $1 || '%' LIMIT 8`;
    } else if (tableName === "staff") {
      dataQuery = `SELECT * FROM "StaffDetails" WHERE is_deleted = FALSE  AND (staff_no::text ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%'  OR surname ILIKE '%' || $1 || '%'  OR phone_number ILIKE '%' || $1 || '%') LIMIT 8`;
    } else if (tableName === "students") {
      dataQuery = `SELECT * FROM "studentDetails" WHERE id_number ILIKE '%' || $1 || '%' OR student_number::text ILIKE '%' || $1 || '%' OR name ILIKE '%' || $1 || '%' OR surname ILIKE '%' || $1 || '%' OR phone_number ILIKE '%' || $1 || '%' LIMIT 8`;
    } else if (tableName === "staff-students") {
      dataQuery = `SELECT name, surname, staff_no 
                    FROM staff WHERE name ILIKE '%' || $1 || '%' OR surname ILIKE '%' || $1 || '%' OR staff_no::text ILIKE '%' || $1 || '%'
                    UNION ALL
                    SELECT name, surname, student_number
                    FROM students 
                    WHERE name ILIKE '%' || $1 || '%' OR surname ILIKE '%' || $1 || '%' OR student_number::text ILIKE '%' || $1 || '%' LIMIT 30`;
    } else if (tableName === "devices-select") {
      dataQuery = `SELECT * FROM "deviceDetails"
     WHERE  is_deleted = FALSE AND serial_no ILIKE '%' || $1 || '%' OR asset_tag  ILIKE '%' || $1 || '%' OR current_user_id::text ILIKE '%' || $1 || '%' LIMIT 30`;
    } else if (tableName === "repairs") {
      dataQuery = `SELECT * FROM "repairTechDeviceDetails"
     WHERE  repair_code ILIKE '%' || $1 || '%' OR repair_type  ILIKE '%' || $1 || '%' OR description ILIKE '%' || $1 || '%' OR notes ILIKE '%' || $1 || '%' OR technican_name ILIKE '%' || $1 || '%' OR make ILIKE '%' || $1 || '%' OR model ILIKE '%' || $1 || '%' OR category ILIKE '%' || $1 || '%' OR serial_no ILIKE '%' || $1 || '%' LIMIT 5`;
    } else {
      dataQuery = "";
    }

    if (!dataQuery) {
      return res.status(400).json({ message: "Search query not provided.", error: true });
    }

    const { rowCount, rows } = await query(dataQuery, [searchQuery]);

    if (rows.length <= 0) {
      return res.status(204).json({ rows, message: "No data found.", error: false });
    }

    return res.status(200).json({ searchResults: rows, totalPages: rowCount, message: "Success.", error: false });
  } catch (error) {
    return console.log(error);
  }
};

module.exports = { search };
