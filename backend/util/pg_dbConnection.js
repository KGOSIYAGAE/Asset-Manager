const pg = require("pg");
require("dotenv").config();

//db config
const dbConnection = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

//connect to db
dbConnection.connect();

//test db connection
dbConnection.on("error", (error) => {
  console.log("Unexpected error on database connection", error);
  process.exit(-1);
});

const query = (text, params) => {
  return dbConnection.query(text, params);
};

module.exports = { query };
