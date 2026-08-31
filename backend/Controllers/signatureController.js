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
/*const getIssuerAndApproverSignatures = async (req, res) => {
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
};*/

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

//get Issuer & Approver signatures
const getIssuerAndreturnerAndApproverSignatures = async (req, res) => {
  try {
    const { device_serial_number, status } = req.query;

    if (!device_serial_number || !status) {
      return res.status(400).json({ message: "All details must be provided", error: true });
    }

    //Get Issuer & Approver ids
    const getIssuerApprover = "SELECT * FROM device_transactions WHERE device_serial_number= $1 AND status = $2";
    const device_transaction = await query(getIssuerApprover, [device_serial_number, status]);

    //console.log(device_transaction.rows[0]);

    if (device_transaction.rows.length === 0) {
      return res.status(400).json({ message: "Device transaction not found", error: true });
    }

    //get_Issuer
    const getIssuer = "SELECT * FROM staff WHERE id = $1";
    const issuer = await query(getIssuer, [device_transaction.rows[0].issued_by]);

    console.log(issuer);

    if (issuer.rows.length === 0) {
      return res.status(400).json({ message: "Issuer not found", error: true });
    }

    //get_Approver
    const getApprover = "SELECT * FROM staff WHERE id = $1";
    const approver = await query(getApprover, [device_transaction.rows[0].approved_by]);

    if (approver.rows.length === 0) {
      return res.status(400).json({ message: "Approver not found", error: true });
    }

    //get_IssuerSignature
    const getIssuerSignature = "SELECT * FROM signatures WHERE user_id = $1";
    const issuerSignature = await query(getIssuerSignature, [issuer.rows[0].staff_no]);

    if (issuerSignature.rows.length === 0) {
      return res.status(400).json({ message: "Issure signature not found", error: true });
    }

    //get_ApproverSignature
    const getApproverSignature = "SELECT * FROM signatures WHERE user_id = $1";
    const approverSignature = await query(getApproverSignature, [approver.rows[0].staff_no]);

    if (approverSignature.rows.length === 0) {
      return res.status(400).json({ message: "Approver signature not found", error: true });
    }

    //get_ReturnerSignature
    let returner = null;
    let ReturnerSignature = null;

    if (device_transaction.rows[0].status === "Returned") {
      //get_Returner
      const getReturner = "SELECT * FROM staff WHERE id = $1";
      returner = await query(getReturner, [device_transaction.rows[0].returned_by]);

      if (returner.rows.length === 0) {
        return res.status(400).json({ message: "Returner not found", error: true });
      }

      const getReturnerSignature = "SELECT * FROM signatures WHERE user_id = $1";
      ReturnerSignature = await query(getReturnerSignature, [returner.rows[0].staff_no]);

      if (ReturnerSignature.rows.length === 0) {
        return res.status(400).json({ message: "Returner signature not found", error: true });
      }
    }

    const signatures = {
      issuerFullname: `${issuer.rows[0].name} ${issuer.rows[0].surname}`,
      issuerSignature: issuerSignature.rows[0].image_base64,
      issue_date: device_transaction.rows[0].issue_date,
      approverFullname: `${approver.rows[0].name} ${approver.rows[0].surname}`,
      approverSignature: approverSignature.rows[0].image_base64,
      approve_date: device_transaction.rows[0].approve_date,
      returnerFullname: returner ? `${returner?.rows[0].name} ${returner.rows[0].surname}` : null,
      returnerSignature: ReturnerSignature ? ReturnerSignature.rows[0].image_base64 : null,
      return_date: device_transaction.rows[0].return_date || null,
    };

    return res.status(200).json({ signatures, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = { getSignatures, getUserSignatures, createSignature, getIssuerAndreturnerAndApproverSignatures };
