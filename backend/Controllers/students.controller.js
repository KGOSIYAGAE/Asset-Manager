const mysql = require("mysql");
const { dbConnection } = require("../dbConnection");

//get Students
const getAllStudents = async (req, res) => {
  const getAllQuery = "SELECT * FROM students";

  dbConnection.query(getAllQuery, (error, results) => {
    if (error) {
      return res.status(400).json({ message: "There was an error fetching data from students", error: true });
    }
    return res.status(200).json({ studentsData: results, message: "Successful", error: false });
  });
};

module.exports = { getAllStudents };
