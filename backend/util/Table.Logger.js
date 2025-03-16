const { dbConnection } = require("../util/dbConnection");

const createNewLog = (action, user_id, item_id, details) => {
  const INSERT_LOG = "INSERT INTO `log_table`(`action`, `user_id`, `item_id`, `details`) VALUES (?)";

  const values = [action, user_id, item_id, details];

  try {
    dbConnection.query(INSERT_LOG, [values], (error, results) => {
      if (error) {
        return console.log("Error occured creating new log entry to table");
      }
      return console.log(`New log entry: ${details}`);
    });
  } catch (error) {
    return console.log(error);
  }
};

module.exports = { createNewLog };
