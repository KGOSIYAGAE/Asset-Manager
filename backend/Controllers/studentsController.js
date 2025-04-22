const { query } = require("../util/pg_dbConnection");

//Get all students
const getStudents = async (req, res) => {
  try {
    const get_students_query = "SELECT * FROM students";

    const { rowCount, rows } = await query(get_students_query);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching students", error: true });
    }

    return res.status(200).json({ rowCount, studentsData: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get student details
const getStudentDetails = async (req, res) => {
  try {
    const { student_no } = req.params;

    if (!student_no) {
      return res.status(400).json({ message: "Student Id must be provided.", error: true });
    }

    const get_student_query = "SELECT * FROM students WHERE student_number = $1";

    const { rowCount, rows } = await query(get_student_query, [student_no]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "Student matching student number not found.", error: true });
    }

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching student.", error: true });
    }

    return res.status(200).json({ rowCount, studentData: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { getStudents, getStudentDetails };
