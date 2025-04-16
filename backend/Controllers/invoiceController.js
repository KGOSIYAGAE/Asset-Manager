const { query } = require("../util/pg_dbConnection");

//get invoices
const getInvoices = async (req, res) => {
  try {
    const get_invoices_query = "SELECT * FROM invoices";

    const { rows } = await query(get_invoices_query);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching invoices", error: true });
    }

    return res.status(200).json({ invoicesList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { getInvoices };
