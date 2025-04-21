const { query } = require("../util/pg_dbConnection");

const getStudents = async (req, res) => {
  try {
    const get_students_query = "SELECT * FROM students";

    const { rowCount, rows } = await query(get_students_query);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching students", error: true });
    }

    return res.status(200).json({ rowCount, rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
