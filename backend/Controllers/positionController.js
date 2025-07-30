const { query } = require("../util/pg_dbConnection");

//Get all positions
const getAllPositions = async (req, res) => {
  try {
    const allPositionsQuery = "SELECT * FROM positions ORDER BY title ASC";

    const { rowCount, rows } = await query(allPositionsQuery);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "No positions found", error: true });
    }

    return res.status(200).json({ rowCount, positionList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { getAllPositions };
