const mysql = require("mysql");
const { dbConnection } = require("../util/dbConnection");
const { createNewLog } = require("../util/Table.Logger");

//get all staff
const getAllStaff = async (req, res) => {
  const sqlQuery = "SELECT * FROM staff";
  dbConnection.query(sqlQuery, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Error fetching data from Staff table", error: true });
    }

    return res.status(200).json({ staffData: results, message: "Successful", error: false });
  });
};

//get one staff
const getStaff = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Staff id not provided", error: true });
  }
  //const sqlGetUser = "SELECT * FROM staff WHERE `staff`.`staff_no` = ?";
  /*const sqlGetUser =
    "SELECT staff.staff_no, staff.name, staff.surname, staff.phone_number, staff.email, staff.department, staff.position, staff.contract_type, staff.isActive, staff.dateJoined, devices.make, devices.model, devices.serial_no FROM devices, staff WHERE devices.assigned_to = staff.staff_no AND staff.staff_no = ?;";
*/
  const sqlGetUser = "SELECT * FROM staff WHERE id = ?";

  dbConnection.query(sqlGetUser, id, (error, results) => {
    if (error) {
      return res.status(400).json({ message: "Error occured when searching for user." });
    }

    return res.status(200).json({ staffData: results, message: "Successful", error: false });
  });
};

//Create new staff
const createStaff = async (req, res) => {
  const { staff_no, name, surname, phone_number, email, department, position, contract_type, isActive, dateJoined, endDate } = req.body;

  if (!staff_no || !name || !surname || !phone_number || !email || !department || !position || !contract_type || !isActive) {
    return res.status(400).json({ message: "All required information must be provided", error: true });
  }

  if (!dateJoined) {
    return res.status(400).json({ message: "Date joined must be provided" });
  }

  const sqlQueryCheckUser = `SELECT * FROM staff WHERE staff_no =${staff_no}`;
  const createUserQuery = "INSERT INTO staff (`staff_no`,`name`,`surname`,`phone_number`,`email`,`department`,`position`,`contract_type`,`isActive`,`dateJoined`,`endDate`) VALUES (?)";

  const values = [staff_no, name, surname, phone_number, email, department, position, contract_type, isActive, dateJoined, endDate];

  //Check if user does not exist already
  dbConnection.query(sqlQueryCheckUser, (error, results) => {
    if (error) {
      return res.status(400).json({ message: "Error searching for user in staff table", error: true });
    }

    if (results.length > 0) {
      res.status(400).json({ message: "User already exist !!", error: true });
    } else {
      //Create new user
      dbConnection.query(createUserQuery, [values], (error, results) => {
        if (error) {
          return res.status(400).json({ errorMessage: error, message: "Error create new user in staff table", error: true });
        }

        //Create log
        createNewLog("create", req.user.values, email, `New staff user created successfully ${email}`);

        return res.status(201).json({ staffData: results, message: "User created successfully", error: false });
      });
      //
    }
  });
};

//Delete staff
const deleteStaff = async (req, res) => {
  const { staff_no } = req.params;

  if (!staff_no) {
    return res.status(400).json({ message: "User staff number must be provided", error: true });
  }

  const deleteQuery = "DELETE FROM staff WHERE `staff`.`staff_no` = ?";

  dbConnection.query(deleteQuery, staff_no, (error, results) => {
    if (error) {
      return res.status(400).json({ message: "Error deleting user", error: true });
    }

    //Create log
    createNewLog("delete", req.user.values, staff_no, `User deleted successfully ${staff_no}`);

    return res.status(200).json({ message: "User deleted successfully", error: false });
  });
};

//Update staff
const updateStaff = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User id must be provided", error: true });
  }

  const { staff_no, name, surname, phone_number, email, department, position, contract_type, isActive, dateJoined, endDate } = req.body;

  if (!staff_no || !name || !surname || !phone_number || !email || !department || !position || !contract_type || !isActive) {
    return res.status(400).json({ message: "All required information must be provided", error: true });
  }

  const values = [staff_no, name, surname, phone_number, email, department, position, contract_type, isActive, dateJoined, endDate];

  const updateQuery =
    "UPDATE staff SET `staff_no`=?,`name`=?,`surname`=?,`phone_number`=?,`email`=?,`department`=?,`position`=?,`contract_type`=?,`isActive`=?,`dateJoined`=?,`endDate`=? WHERE `id`=?";

  dbConnection.query(updateQuery, [...values, id], (error, results) => {
    if (error) {
      return res.status(400).json({ message: "Error updating user on staff table", error: true });
    }

    //Create log
    createNewLog("update", req.user.values, email, `User updated successfully ${email}`);

    res.status(200).json({ message: "User updated successfully", error: false });
  });
};

module.exports = { getAllStaff, getStaff, createStaff, deleteStaff, updateStaff };
