const jwt = require("jsonwebtoken");
const { dbConnection } = require("../util/dbConnection");

const requireAuth = async (req, res, next) => {
  //Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Authorization token required", error: true });
  }

  const token = authorization.split(" ")[1];

  try {
    const { email } = jwt.verify(token, process.env.SECRET);

    const findUserQuery = `SELECT * FROM admin_users WHERE email = ?`;

    req.user = dbConnection.query(findUserQuery, email, async (error, results) => {
      if (error) {
        return res.status(400).json({ message: error, error: true });
      }

      if (results.length <= 0) {
        return res.status(400).json({ message: "Email not found", error: true });
      }

      return results.username;
    });

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ errorStatus: 401, message: "Request not authorized", error: true });
  }
};

module.exports = requireAuth;
