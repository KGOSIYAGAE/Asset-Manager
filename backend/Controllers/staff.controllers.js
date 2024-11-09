const mysql = require("mysql");
const { dbConnection } = require("../dbConnection");

//get all staff
const getAllStaff = async (req, res) => {
  const sqlQuery = "SELECT * FROM staff";
  dbConnection.query(sqlQuery, (error, results) => {
    if (error) {
      return res.json({ message: "Error fetching data from Staff table", error: true });
    }

    return res.json({ staffData: results, message: "Successful", error: false });
  });
};

//Create new staff
const createStaff = async (req, res) => {
  const { staff_no, name, surname, phone_number, email, department, position, contract_type, isActive } = req.body;

  if (!staff_no || !name || !surname || !phone_number || !email || !department || !position || !contract_type || !isActive) {
    return res.json({ message: "All required information must be provided", error: true });
  }

  const sqlQueryCheckUser = `SELECT * FROM staff WHERE staff_no =${staff_no}`;
  const createUserQuery = "INSERT INTO staff (`staff_no`,`name`,`surname`,`phone_number`,`email`,`department`,`position`,`contract_type`,`isActive`) VALUES (?)";

  const values = [staff_no, name, surname, phone_number, email, department, position, contract_type, isActive];
  //Check if user does not exist already
  dbConnection.query(sqlQueryCheckUser, (error, results) => {
    if (error) {
      return res.json({ message: "Error searching for user in staff table", error: true });
    }

    if (results.length > 0) {
      return res.json({ message: "User already exist in the staff table", error: true });
    }

    //Create new user
    dbConnection.query(createUserQuery, [values], (error, results) => {
      if (error) {
        return res.json({ errorMessage: error, message: "Error create new user in staff table", error: true });
      }

      return res.json({ staffData: results, message: "User created successfully", error: false });
    });
    //
  });
};

module.exports = { getAllStaff, createStaff };
