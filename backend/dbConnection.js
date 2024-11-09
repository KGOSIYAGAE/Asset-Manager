const mysql = require("mysql");

//Create connection with data base
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test1",
});

module.exports = { dbConnection };
