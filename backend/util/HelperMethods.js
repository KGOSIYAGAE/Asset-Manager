const { query } = require("../util/pg_dbConnection");

const getIssuer = async (issuerId, res) => {
  try {
    const getIssuerQuery = "SELECT * FROM staff WHERE id = $1";
    const issuerDetails = await query(getIssuerQuery, [issuerId]);

    if (!issuerDetails) {
      return res.status(400).json({ issuerDetails, message: `iSSUER NOT FOUND`, error: true });
    }

    return issuerDetails[0].rows;
  } catch (error) {
    return res.status(500).json({ message: `Server Error: ${error}`, error: true });
    throw error;
  }
};

const getApprovers = async (res) => {
  try {
    //get Approver list
    const getApproverQuery = "SELECT * FROM staff WHERE userrole = 'support_admin'";
    const { rows } = await query(getApproverQuery);

    let approverList = [];
    rows.map((row) => approverList.push(row.email));

    //return res.status(200).json({ approverList, message: ``, error: true });

    if (!approverList) {
      return res.status(400).json({ message: `Email reciever not provided`, error: true });
    }

    return approverList;
  } catch (error) {
    return res.status(500).json({ message: `Server Error: ${error}`, error: true });
    throw error;
  }
};

const getReceiver = async (receiverId, res) => {
  try {
    //get receiver details
    let getReceiverQuery;

    if (String(reciever_id).length >= 6) {
      getReceiverQuery = "SELECT * FROM students WHERE student_number = $1";
    } else {
      getReceiverQuery = "SELECT * FROM staff WHERE staff_no = $1";
    }

    const recieverDetails = await query(getReceiverQuery, [reciever_id]);

    if (!recieverDetails) {
      return res.status(400).json({ issuerDetails, message: `Reciever NOT FOUND`, error: true });
    }

    return recieverDetails[0].rows;
  } catch (error) {
    return res.status(500).json({ message: `Server Error: ${error}`, error: true });
    throw error;
  }
};

const getDeviceIssued = async (deviceId, res) => {
  try {
    //get receiver details
    let getDeviceQuery = `SELECT * FROM "deviceDetails" WHERE serial_no = $1 AND status = 'Loan Approval required'  OR status= 'Issue Approval required'`;

    const deviceDetails = await query(getDeviceQuery, [deviceId]);

    if (!deviceDetails) {
      return res.status(400).json({ deviceDetails, message: `Device NOT FOUND`, error: true });
    }

    return deviceDetails[0].rows;
  } catch (error) {
    return res.status(500).json({ message: `Server Error: ${error}`, error: true });
    throw error;
  }
};

module.exports = {
  getApprovers,
  getIssuer,
  getReceiver,
  getDeviceIssued,
};
