const { query } = require("../util/pg_dbConnection");

//get signatures
const getSignatures = async (req, res) => {
  try {
    const get_sigantures_query = "SELECT * FROM signatures";

    const { rows } = await query(get_sigantures_query);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching signatures", error: true });
    }

    return res.status(200).json({ signatureList: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//get user signatures
const getUserSignatures = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID required", error: true });
    }

    const get_sigantures_query = "SELECT * FROM signatures WHERE user_id = $1";

    const { rows, rowCount } = await query(get_sigantures_query, [user_id]);

    if (rowCount > 0) {
      return res.status(200).json({ signatureList: rows, message: "Success", error: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//get Issuer & Approver signatures
const getIssuerAndApproverSignatures = async (req, res) => {
  try {
    const { device_id } = req.params;

    if (!device_id) {
      return res.status(400).json({ message: "Device ID required", error: true });
    }

    const get_sigantures_query = `SELECT * FROM "issuerApproverSignatures" WHERE item_id = $1 ORDER by requested_date DESC LIMIT 1`;

    const { rows, rowCount } = await query(get_sigantures_query, [device_id]);

    if (rowCount > 0) {
      return res.status(200).json({ signatureList: rows, message: "Success", error: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Create staff
const createSignature = async (req, res) => {
  try {
    const { user_id, image_base64 } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required", error: true });
    }
    if (!image_base64) {
      return res.status(400).json({ message: "Image Base 64 fomart is required", error: true });
    }

    const check_userSignature = "SELECT * FROM signatures WHERE user_id = $1";

    const { rows } = await query(check_userSignature, [user_id]);

    if (rows.length > 0) {
      const updateSignature = "UPDATE signatures SET image_base64=$1 WHERE user_id=$2";
      const VALUES = [image_base64];
      const { rowCount } = await query(updateSignature, [...VALUES, user_id]);

      return res.status(200).json({ message: "signature updated.", error: false });
    }

    const create_signature_query = "INSERT INTO signatures (user_id,image_base64) VALUES ($1, $2)";
    const VALUES = [user_id, image_base64];

    const { rowCount } = await query(create_signature_query, [...VALUES]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured creating signature.", error: true });
    }

    return res.status(200).json({ rowCount, message: "Signature successfully created", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { getSignatures, getUserSignatures, createSignature, getIssuerAndApproverSignatures };
