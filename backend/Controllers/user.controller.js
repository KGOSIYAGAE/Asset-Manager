const { dbConnection } = require("../dbConnection");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (username) => {
  return jwt.sign({ username }, process.env.SECRET, { expiresIn: "2d" });
};

//Login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All field must be provided", error: true });
    }

    const loginQuery = `SELECT * FROM users WHERE username = ?`;

    dbConnection.query(loginQuery, username, async (error, results) => {
      if (error) {
        return res.status(400).json({ message: error, error: true });
      }

      if (results.length <= 0) {
        return res.status(400).json({ message: "Usermame not found", error: true });
      }

      const match = await bcrypt.compare(password, results[0].password);

      if (!match) {
        return res.status(400).json({ message: "Password incorrect", error: true });
      }

      const token = createToken(username);

      return res.status(200).json({ username, token, message: "Login successful", error: false });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: true });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All field must be provided", error: true });
  }

  if (!validator.isEmail(username)) {
    return res.status(400).json({ message: "username must be a valid email", error: true });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "Password not strong enough", error: true });
  }

  const checkExitQuery = `SELECT * FROM users WHERE username = ?`;

  //Check if user exist
  dbConnection.query(checkExitQuery, username, async (error, results) => {
    if (error) {
      return res.status(400).json({ message: error, error: true });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Username already in use", error: true });
    }

    //Create user
    const createUserQuery = "INSERT INTO users (`username`, `password`, `role`) VALUES (?)";

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const values = [username, hashPassword, role];

    dbConnection.query(createUserQuery, [values], async (error, results) => {
      if (error) {
        return res.status(400).json({ message: "An error occured creating user", error: true });
      }

      const token = createToken(username);

      return res.status(200).json({ token, message: "User created successfully", error: false });
    });
  });
};

module.exports = { loginUser, signupUser };
