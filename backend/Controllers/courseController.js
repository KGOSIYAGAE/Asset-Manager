const { query } = require("../util/pg_dbConnection");

//Get all courses
const getAllCourses = async (req, res) => {
  try {
    const get_all_courses_query = "SELECT * FROM courses";

    const { rowCount, rows } = await query(get_all_courses_query);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching courses", error: true });
    }

    return res.status(200).json({ courseList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { getAllCourses };
