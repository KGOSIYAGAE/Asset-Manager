const { query } = require("../util/pg_dbConnection");

///Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const getAllDepartments_query = "SELECT * FROM departments";

    const { rowCount, rows } = await query(getAllDepartments_query);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "No departments found", error: true });
    }
    return res.status(200).json({ rowCount, departmentList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { getAllDepartments };
