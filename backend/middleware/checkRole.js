const jwt = require("jsonwebtoken");

const { query } = require("../util/pg_dbConnection");

const roles = {
  admin: {
    can: ["create", "edit", "delete", "view"],
  },
  editor: {
    can: ["create", "edit", "view"],
  },
  viewer: {
    can: ["view"],
  },
};

const checkRole = (action) => {
  console.log(action);
  return async (req, res, next) => {
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

      const permissions = roles[`${rows[0].userrole}`].can;

      if (permissions.includes(action)) {
        req.user = rows[0]._id;
        next();
      } else {
        return res.status(403).json({ message: "Access Denied", error: true });
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({ errorStatus: 401, message: "Request not authorized, Please login.", error: true });
    }
  };
};

module.exports = checkRole;
