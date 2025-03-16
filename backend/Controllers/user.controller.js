const { dbConnection } = require("../util/dbConnection");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "7200s" });
};

//Login user
const loginUser = async (req, res) => {
  try {
    const { email, password_hash } = req.body;

    if (!email || !password_hash) {
      return res.status(400).json({ message: "All field must be provided", error: true });
    }

    const loginQuery = `SELECT * FROM admin_users WHERE email = ?`;

    dbConnection.query(loginQuery, email, async (error, results) => {
      if (error) {
        return res.status(400).json({ message: error, error: true });
      }

      if (results.length <= 0) {
        return res.status(400).json({ message: "Email not found", error: true });
      }

      const match = await bcrypt.compare(password_hash, results[0].password_hash);

      if (!match) {
        return res.status(400).json({ message: "Password incorrect", error: true });
      }

      const token = createToken(email);

      return res.status(200).json({ username: results[0].username, role: results[0].role, token, message: "Login successful", error: false });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: true });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { password_hash, first_name, last_name, email, role } = req.body;

  if (!password_hash || !first_name || !last_name || !email || !role) {
    return res.status(400).json({ message: "All field must be provided", error: true });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "username must be a valid email", error: true });
  }

  if (!validator.isStrongPassword(password_hash)) {
    return res.status(400).json({ message: "Password not strong enough", error: true });
  }

  const checkExitQuery = `SELECT * FROM admin_users WHERE email = ?`;

  //Check if user exist
  dbConnection.query(checkExitQuery, email, async (error, results) => {
    if (error) {
      return res.status(400).json({ message: error, error: true });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already in use", error: true });
    }

    //Create user
    const createUserQuery = "INSERT INTO admin_users (`username`, `password_hash`,`first_name`,`last_name`,`email`, `role`) VALUES (?)";

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password_hash, salt);

    //Create username
    const fullName = `${first_name} ${last_name}`;

    const values = [fullName, hashPassword, first_name, last_name, email, role];

    dbConnection.query(createUserQuery, [values], async (error, results) => {
      if (error) {
        return res.status(400).json({ message: "An error occured creating user", errorM: error, error: true });
      }

      const token = createToken(email);

      return res.status(200).json({ token, message: "User created successfully", error: false });
    });
  });
};

module.exports = { loginUser, signupUser };
