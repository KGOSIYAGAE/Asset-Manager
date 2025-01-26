const { dbConnection } = require("../dbConnection");
const bcrypt = require("bcrypt");

//Login user
const loginUser = async (req, res) => {
  return res.status(200).json({ message: "Login" });
};

//signup user
const signupUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username not provided", error: true });
  }

  if (!password) {
    return res.status(400).json({ message: "Password not provided", error: true });
  }

  if (!role) {
    return res.status(400).json({ message: "Role not provided", error: true });
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

      return res.status(200).json({ message: "User created successfully", error: false });
    });
  });
};

module.exports = { loginUser, signupUser };
