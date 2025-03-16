const { dbConnection } = require("../util/dbConnection");
const { createNewLog } = require("../util/Table.Logger");

//get Students
const getAllStudents = async (req, res) => {
  const getAllQuery = "SELECT * FROM students";
  try {
    dbConnection.query(getAllQuery, (error, results) => {
      if (error) {
        return res.status(400).json({ message: "There was an error fetching data from students", error: true });
      }
      return res.status(200).json({ studentsData: results, message: "Successful", error: false });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Cont student
const getStudent = async (req, res) => {
  const { student_no } = req.params;

  if (!student_no) {
    return res.status(400).json({ message: "Student number must be provided.", error: true });
  }

  try {
    const query = "SELECT * FROM students WHERE student_no = ?";
    dbConnection.query(query, student_no, (error, results) => {
      if (error) {
        return res.status(400).json({ message: "Student not found", error: true });
      }
      return res.status(200).json({ studentData: results, message: "User Found successfully", error: false });
    });
  } catch (error) {}
};

//Add Student
const addStudents = async (req, res) => {
  const { name, surname, student_no, phone_number, email, faculty, course, course_code, isActive, registration_date } = req.body;

  try {
    if (!name || !surname || !student_no || !phone_number || !email || !faculty || !course || !course_code || !isActive) {
      return res.status(400).json({ message: "All details must be provided" });
    }

    if (!registration_date) {
      return res.status(400).json({ message: "Registration date must be provided" });
    }

    const checkUserQuery = "SELECT * FROM students WHERE `student_no` = ?";

    const values = [name, surname, student_no, phone_number, email, faculty, course, course_code, isActive, registration_date];
    const addQuery = "INSERT INTO students (`name`, `surname`, `student_no`, `phone_number`, `email`, `faculty`, `course`, `course_code`, `isActive`, `registration_date`) VALUES (?)";

    dbConnection.query(checkUserQuery, student_no, (error, results) => {
      if (error) {
        return res.status(400).json({ message: "There was an error reading students table", error: true });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "User Already Exists.", error: true });
      } else {
        dbConnection.query(addQuery, [values], (error, results) => {
          if (error) {
            return res.status(400).json({ message: "The was an error inserting data in to students table", error: true });
          }

          //Create log
          createNewLog("create", req.user.values, email, `New student user created successfully ${email}`);

          return res.status(200).json({ message: "Student Added Successfully", error: false });
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Update student
const updateStudent = async (req, res) => {
  const params_student_no = req.params.student_no;

  const { name, surname, student_no, phone_number, email, faculty, course, course_code, isActive, registration_date } = req.body;

  try {
    if (!params_student_no) {
      return res.status(400).json({ message: "Student number must be provided.", error: true });
    }

    if (!name || !surname || !student_no || !phone_number || !email || !faculty || !course || !course_code || !isActive || !registration_date) {
      return res.status(400).json({ message: "All details must be provided" });
    }

    const values = [name, surname, student_no, phone_number, email, faculty, course, course_code, isActive, registration_date];
    const updateStudentQuery =
      "UPDATE students SET `name`=?,`surname`=?,`student_no`=?,`phone_number`=?,`email`=?,`faculty`=?,`course`=?,`course_code`=?,`isActive`=?,`registration_date`=? WHERE `student_no` = ?";
    dbConnection.query(updateStudentQuery, [...values, params_student_no], (error, results) => {
      if (error) {
        return res.status(400).json({ message: "An error occured when updating student details", error: true });
      }

      //Create log
      createNewLog("update", req.user.values, email, `Student updated successfully ${email}`);

      return res.status(200).json({ message: "Student updated successfully", error: false });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error.", error: true });
  }
};

//delete student
const deleteStudent = async (req, res) => {
  const { student_no } = req.params;

  if (!student_no) {
    return res.status(400).json({ message: "Student number must be provided.", error: true });
  }

  try {
    const deleteStudentQuery = "DELETE FROM students WHERE `students`.`student_no` = ?";

    dbConnection.query(deleteStudentQuery, student_no, (error, results) => {
      if (error) {
        return res.status(400).json({ message: "Error deleting a student.", error: true });
      }

      //Create log
      createNewLog("delete", req.user.values, student_no, `Student deleted successfully ${student_no}`);

      return res.status(200).json({ message: "User delete successfully", error: false });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { getAllStudents, getStudent, addStudents, updateStudent, deleteStudent };
