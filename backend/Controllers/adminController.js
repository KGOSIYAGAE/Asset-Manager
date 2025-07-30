const { query } = require("../util/pg_dbConnection");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Token method
const createToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "3600s" });
};

//Password hashing
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(password, salt);

  return hash_password;
};

//Admin Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "User email required", error: true });
    }

    if (!password) {
      return res.status(400).json({ message: "User password required", error: true });
    }

    /*const SQL_QUERY = "SELECT * FROM admin_users WHERE email = $1";*/
    const SQL_QUERY = "SELECT * FROM staff WHERE email = $1";

    const { rows } = await query(SQL_QUERY, [email]);

    if (rows.length <= 0) {
      return res.status(400).json({ message: "Email incorrect", error: true });
    }

    //Verify password
    const match = await bcrypt.compare(password, rows[0]?.hash_password);

    if (!match) {
      return res.status(400).json({ message: "Password incorrect", error: true });
    }

    const token = createToken(email);

    return res.status(200).json({
      /*fullName: `${rows[0]?.firstname} ${rows[0]?.lastname}`,*/
      fullName: `${rows[0]?.name} ${rows[0]?.surname}`,
      email: email,
      role: rows[0]?.userrole,
      id: rows[0].id,
      token,
      message: "Login Success",
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Admin Signup
const signUp = async (req, res) => {
  try {
    const { password, first_name, last_name, email, role } = req.body;

    if (!password || !first_name || !last_name || !email || !role) {
      return res.status(400).json({ message: "All field must be provided", error: true });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Username must be a valid email", error: true });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Password not strong enough", error: true });
    }

    //Check if user exist
    const checkExitQuery = "SELECT * FROM admin_users WHERE email = $1";
    const userRowCount = (await query(checkExitQuery, [email])).rowCount;

    if (userRowCount > 0) {
      return res.status(400).json({ message: "Email already in use.", error: true });
    }

    //Password hashing
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    //Create user
    const CREATE_SQL = "INSERT INTO admin_users (firstname, lastname, email, hash_password, userrole) VALUES ($1, $2, $3, $4, $5)";
    const VALUES = [first_name, last_name, email, hash_password, role];
    const { rowCount } = await query(CREATE_SQL, [...VALUES]);

    if (rowCount > 0) {
      //Create Token
      const token = createToken(email);

      return res.status(200).json({ token, message: "Admin created successfully", error: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Admin change password
const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  console.log(email);

  try {
    if (!email) {
      return res.status(400).json({ message: "User email required", error: true });
    }

    if (!oldPassword) {
      return res.status(400).json({ message: "Old password required", error: true });
    }

    if (!newPassword) {
      return res.status(400).json({ message: "New password required", error: true });
    }

    const SQL_QUERY = "SELECT * FROM staff WHERE email = $1";

    const { rows } = await query(SQL_QUERY, [email]);

    if (rows.length <= 0) {
      return res.status(400).json({ message: "Email incorrect", error: true });
    }

    //Verify password
    const match = await bcrypt.compare(oldPassword, rows[0]?.hash_password);

    if (!match) {
      return res.status(400).json({ message: "Old password incorrect", error: true });
    }

    //Password hashing
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(newPassword, salt);

    const update_passwordQuery = "UPDATE staff SET hash_password=$1 WHERE email = $2;";

    const { rowCount } = await query(update_passwordQuery, [hash_password, email]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when updating the device", error: true });
    }
    //Create new log
    //createNewLog("Update", req.user, id, `Password successfully updated.`);

    return res.status(200).json({ rowCount, message: "Password successfully changed", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

module.exports = { login, signUp, changePassword };
