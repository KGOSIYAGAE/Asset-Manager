const jwt = require("jsonwebtoken");

const { query } = require("../util/pg_dbConnection");

const requireAuth = async (req, res, next) => {
  //Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Authorization token required", error: true });
  }

  const token = authorization.split(" ")[1];

  try {
    const { email } = jwt.verify(token, process.env.SECRET);

    const findUserQuery = "SELECT * FROM admin_users WHERE email = $1";

    const { rowCount, rows } = await query(findUserQuery, [email]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "Email not found", error: true });
    }

    req.user = rows[0]._id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ errorStatus: 401, message: "Request not authorized, Please login.", error: true });
  }
};

module.exports = requireAuth;
