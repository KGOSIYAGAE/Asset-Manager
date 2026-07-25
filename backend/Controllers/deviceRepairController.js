const { query } = require("../util/pg_dbConnection");
const format = require("pg-format");

//Create repair
const createRepair = async (req, res) => {
  try {
    const { deviceId, repairType, repairDescription, technicianId, repairNotes, current_status_id, dislaimerAccepted } = req.body;

    if (!deviceId || !repairType || !repairDescription || !technicianId || !current_status_id) {
      return res.status(400).json({ message: "All details must be provided!" });
    }

    const verifyDevice = "SELECT * FROM devices WHERE id=$1;";
    const deviceResponse = await query(verifyDevice, [deviceId]);

    if (deviceResponse.rowCount === 0) {
      return res.status(400).json({ message: "Device not found", error: true });
    }

    //Update Laptop current operational state & condition
    const updateDeviceCurrentState = "UPDATE devices SET operational_state=$1, device_condition=$2, updated_at=NOW() WHERE id=$3";
    const deviceState = await query(updateDeviceCurrentState, ["Under Maintenance", "Faulty", deviceId]);

    if (deviceState.rowCount === 0) {
      return res.status(400).json({ message: "Device not updated", error: true });
    }

    const create_repair_query =
      "INSERT INTO repairs ( device_id, repair_type, current_status_id, assigned_to, description, notes,dislaimer_ccepted, date_created, updated_at ) VALUES ($1,$2,$3,$4,$5,$6,$7,NOW(), NOW());";
    const VALUES = [deviceId, repairType, current_status_id, technicianId, repairDescription, repairNotes, dislaimerAccepted];

    const { rowCount, rows } = await query(create_repair_query, [...VALUES]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when creating a device", error: true });
    }

    return res.status(200).json({ rowCount, message: "Repair successfully created", error: false });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

//Create repair
const udateRepair = async (req, res) => {
  try {
    const { repairId, repairType, repairDescription, technicianId, repairNotes } = req.body;

    if (!repairId || !repairType || !repairDescription || !technicianId) {
      return res.status(400).json({ message: "All details must be provided!" });
    }

    const verifyRepair = "SELECT * FROM repairs WHERE id=$1;";
    const repairResponse = await query(verifyRepair, [repairId]);

    if (repairResponse.rowCount === 0) {
      return res.status(400).json({ message: "Repair not found", error: true });
    }

    //Update Laptop current operational state & condition
    const updateRepair = "UPDATE repairs SET repair_type=$1, description=$2, assigned_to=$3, notes=$4, updated_at=NOW() WHERE id=$5";
    const { rowCount } = await query(updateRepair, [repairType, repairDescription, technicianId, repairNotes, repairId]);

    if (rowCount === 0) {
      return res.status(400).json({ message: "Repair not updated", error: true });
    }

    return res.status(200).json({ rowCount, message: "Repair successfully updated", error: false });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

//Get All repairs
const getAllrepairs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const status = req.query.status;
    const offset = (page - 1) * limit;

    let countQuery;
    let countResponse;

    if (status === "All") {
      countQuery = `SELECT COUNT(*) AS total FROM "repairTechDeviceDetails"`;
      countResponse = await query(countQuery);
    } else {
      countQuery = `SELECT COUNT(*) AS total FROM "repairTechDeviceDetails" WHERE status_name=$1`;
      countResponse = await query(countQuery, [status]);
    }

    //Get device count

    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    const totalDevices = countResponse.rows[0].total;

    const totalPages = Math.ceil(totalDevices / limit);

    let getRepiarsQuery;
    let response;

    if (status === "All") {
      getRepiarsQuery = `SELECT * FROM "repairTechDeviceDetails" ORDER BY date_created DESC LIMIT $1 OFFSET $2 `;
      response = await query(getRepiarsQuery, [limit, offset]);
    } else {
      getRepiarsQuery = `SELECT * FROM "repairTechDeviceDetails" WHERE status_name=$1 ORDER BY date_created DESC LIMIT $2 OFFSET $3 `;
      response = await query(getRepiarsQuery, [status, limit, offset]);
    }

    if (!response.rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    return res.status(200).json({ deviceList: response.rows, totalPages: totalPages, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

//Get repair
const getRepair = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Repair id not provided", error: true });
    }

    const getRepiarQuery = `SELECT * FROM "repairDeviceDetails" WHERE id = $1`;
    const { rows } = await query(getRepiarQuery, [id]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching repair", error: true });
    }

    return res.status(200).json({ repairDetails: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

//Get repair
const getRepairProgress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Repair id not provided", error: true });
    }

    const getRepiarProgressQuery = `SELECT 
                                    rsh.changed_at,
                                    rs.status_name
                                    FROM repair_status_history rsh
                                    JOIN repair_statuses rs
                                    ON rsh.status_id = rs.id
                                    WHERE repair_id = $1
                                    ORDER BY rsh.changed_at ASC;`;

    const { rows } = await query(getRepiarProgressQuery, [id]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching repair", error: true });
    }

    return res.status(200).json({ repairProgress: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

//Get All repairs
const getAllrepairsForTech = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User id not provided", error: true });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const countQuery = `SELECT COUNT(*) AS total FROM "repairTechDeviceDetails" WHERE assigned_to = $1`;

    //Get device count
    const countResponse = await query(countQuery, [userId]);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    const totalDevices = countResponse.rows[0].total;

    const totalPages = Math.ceil(totalDevices / limit);

    const getRepiarsQuery = `SELECT * FROM "repairTechDeviceDetails" WHERE assigned_to = $1 ORDER BY date_created DESC LIMIT $2 OFFSET $3`;
    const { rows } = await query(getRepiarsQuery, [userId, limit, offset]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    return res.status(200).json({ deviceList: rows, totalPages: totalPages, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

//Get All repairs stats
const getRepairsStats = async (req, res) => {
  try {
    const getRepairsStatsQuery = `SELECT * FROM "allRepairStats";`;

    const { rows } = await query(getRepairsStatsQuery);

    if (!rows) {
      return res.status(400).json({ message: "Repairs stats not found", error: true });
    }

    return res.status(200).json({ allRepairsStats: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Get All repairs stats for technician
const getRepairsStatsForTech = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User id not provided", error: true });
    }

    const getRepairsStatsQuery = ` SELECT count(*) AS total_repairs,
    count(*) FILTER (WHERE repair_statuses.id = 1) AS new_repairs,
	 count(*) FILTER (WHERE repair_statuses.id = 2) AS under_assesment,
	  count(*) FILTER (WHERE repair_statuses.id = 3) AS awaiting_parts,
    count(*) FILTER (WHERE repair_statuses.id = 4) AS in_progress,
    count(*) FILTER (WHERE repair_statuses.id = 5) AS testing,
    count(*) FILTER (WHERE repair_statuses.id = 6) AS ready_for_collection,
    count(*) FILTER (WHERE repair_statuses.id = 7) AS beyond_repair,
	    count(*) FILTER (WHERE repair_statuses.id = 8) AS completed,
		 count(*) FILTER (WHERE date_created < (now() - '14 days'::interval)) AS overdue_repairs
   
 FROM repairs
 JOIN repair_statuses ON repairs.current_status_id = repair_statuses.id

 WHERE assigned_to = $1`;

    const { rows } = await query(getRepairsStatsQuery, [userId]);

    if (!rows) {
      return res.status(400).json({ message: "Repairs stats not found", error: true });
    }

    return res.status(200).json({ allRepairsStats: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Update repair status
const updateStatus = async (req, res) => {
  try {
    const { repairId, statusId } = req.params;

    if (!repairId) {
      return res.status(400).json({ message: "Repair id must be provided", error: true });
    }

    if (!statusId) {
      return res.status(400).json({ message: "Status id must be provided", error: true });
    }

    const update_status_query = "UPDATE repairs SET current_status_id = $1 WHERE id = $2";
    const VALUES = [statusId, repairId];

    const { rowCount, rows } = await query(update_status_query, [...VALUES]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when updating the device", error: true });
    }

    return res.status(200).json({ rowCount, message: "Status updated successfully", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = {
  createRepair,
  udateRepair,
  getAllrepairs,
  getRepair,
  getAllrepairsForTech,
  getRepairsStats,
  getRepairsStatsForTech,
  updateStatus,
  getRepairProgress,
};
