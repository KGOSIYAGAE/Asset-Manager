const { query } = require("../util/pg_dbConnection");
const format = require("pg-format");

const checkStudentExist = async (req, res) => {};

//Get all students
const getStudents = async (req, res) => {
  try {
    const get_students_query = `SELECT * FROM "studentDetails" ORDER BY created_at DESC`;

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

    const get_student_query = `SELECT * FROM "studentDetails" WHERE student_number = $1`;

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

//Create student
const createStudent = async (req, res) => {
  try {
    const { name, surname, studentNumber, idNumber, phone_number, email, faculty_name, course, course_code, isActive, registration_date } = req.body;

    if (!name || !surname || !studentNumber || !idNumber || !phone_number || !email || !faculty_name || !course || !course_code || !isActive || !registration_date) {
      return res.status(400).json({ message: "All field must be provided", error: true });
    }

    const checkUserQuery = "SELECT * FROM students WHERE student_number = $1";

    const { rows } = await query(checkUserQuery, [studentNumber]);

    if (rows.length > 0) {
      return res.status(400).json({ rows, message: "User mathcing student number already exists", error: true });
    }

    const create_user_query =
      "INSERT INTO students (name, surname, id_number, phone_number, email, student_number, faculty_name, course_name, course_code , acc_status, registration_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
    const VALUES = [name, surname, idNumber, phone_number, email, studentNumber, faculty_name, course, course_code, isActive, registration_date];

    const { rowCount } = await query(create_user_query, [...VALUES]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured creating student", error: true });
    }

    return res.status(200).json({ rowCount, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Bulk create students
const bulkCreateStudents = async (req, res) => {
  try {
    const { students } = req.body;

    if (!Array.isArray(students || students.length === 0)) {
      return res.status(400).json({ message: "Invalid or empty student list", error: true });
    }

    const VALUES = students.map((student) => [
      student.name,
      student.surname,
      student.studentNumber,
      student.idNumber,
      student.phone_number,
      student.email,
      student.faculty_name,
      student.course_name,
      student.course_code,
      student.isActive,
      student.registration_date,
    ]);

    const bulk_create_students_query = format(
      "INSERT INTO students (name, surname, student_number, id_number, phone_number, email, faculty_name, course_name, course_code, acc_status, registration_date) VALUES %L",
      VALUES,
    );

    const { rowCount } = await query(bulk_create_students_query);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when adding students", error: true });
    }

    return res.status(200).json({ rowCount, message: `${rowCount} students successfully created.`, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Update student
const updateStudent = async (req, res) => {
  try {
    const { student_no } = req.params;

    if (!student_no) {
      return res.status(400).json({ message: "Student number must be provided", error: true });
    }

    const { name, surname, studentNumber, idNumber, phone_number, email, faculty_name, course, course_code, isActive, registration_date } = req.body;

    if (!name || !surname || !studentNumber || !idNumber || !phone_number || !email || !faculty_name || !course || !course_code || !isActive || !registration_date) {
      return res.status(400).json({ message: "All field must be provided", error: true });
    }

    const update_student_query =
      "UPDATE students SET name=$1, surname=$2, id_number=$3, phone_number=$4, email=$5, student_number=$6, faculty_name=$7, course_name=$8, course_code=$9, acc_status=$10, registration_date=$11 WHERE student_number = $12";
    const VALUES = [name, surname, idNumber, phone_number, email, studentNumber, faculty_name, course, course_code, isActive, registration_date];

    const { rowCount, rows } = await query(update_student_query, [...VALUES, student_no]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when updating the device", error: true });
    }

    return res.status(200).json({ rowCount, message: "Student updated successfully", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Delete student
const deleteStudent = async (req, res) => {
  try {
    const { student_no } = req.params;

    if (!student_no) {
      return res.status(400).json({ message: "Student number ggdgdgmust be provided", error: true });
    }

    const checkUserQuery = "SELECT * FROM students WHERE student_number = $1";

    const { rows } = await query(checkUserQuery, [student_no]);

    if (rows.length <= 0) {
      return res.status(400).json({ rows, message: "User mathcing student number not found", error: true });
    }

    const delete_student_query = "DELETE FROM students WHERE student_number = $1";
    const rowCount = await query(delete_student_query, [student_no]);

    return res.status(200).json({ message: "Student deleted successfully", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};
module.exports = { getStudents, getStudentDetails, createStudent, bulkCreateStudents, updateStudent, deleteStudent };
