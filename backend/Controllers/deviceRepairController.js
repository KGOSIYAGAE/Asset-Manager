const { query } = require("../util/pg_dbConnection");
const format = require("pg-format");

//Create repair
const createRepair = async (req, res) => {
  try {
    const { deviceId, repairType, repairDescription, technicianId, repairNotes, repairStatus } = req.body;

    //return res.status(400).json({ assetTag, make, model, serial_no, spec, category, device_condition, status, warranty_end_date, invoice_no, purchaseValue, currentValue });

    if (!deviceId || !repairType || !repairDescription || !technicianId || !repairStatus) {
      return res.status(400).json({ message: "All details must be provided!" });
    }

    const create_repair_query = "INSERT INTO repairs ( device_id, repair_type, repair_status, assigned_to, description, notes, date_created, updated_at ) VALUES ($1,$2,$3,$4,$5,$6,NOW(), NOW());";
    const VALUES = [deviceId, repairType, repairStatus, technicianId, repairDescription, repairNotes];

    const { rowCount } = await query(create_repair_query, [...VALUES]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when creating a device", error: true });
    }

    return res.status(200).json({ rowCount, message: "Repair successfully created", error: false });
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
    const offset = (page - 1) * limit;

    const countQuery = `SELECT COUNT(*) AS total FROM "repairTechDeviceDetails"`;

    //Get device count
    const countResponse = await query(countQuery);
    if (!countResponse.rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    const totalDevices = countResponse.rows[0].total;

    const totalPages = Math.ceil(totalDevices / limit);

    const getRepiarsQuery = `SELECT * FROM "repairTechDeviceDetails" LIMIT $1 OFFSET $2`;
    const { rows } = await query(getRepiarsQuery, [limit, offset]);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching devices", error: true });
    }

    return res.status(200).json({ deviceList: rows, totalPages: totalPages, message: "Success", error: false });
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

    const getRepiarsQuery = `SELECT * FROM "repairTechDeviceDetails" WHERE assigned_to = $1 LIMIT $2 OFFSET $3`;
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
    count(*) FILTER (WHERE repair_status::text = 'New'::text) AS new_repairs,
    count(*) FILTER (WHERE repair_status::text = 'In progress'::text) AS in_progress,
    count(*) FILTER (WHERE repair_status::text = 'Awaiting Parts'::text) AS awaiting_parts,
    count(*) FILTER (WHERE repair_status::text = 'Quality Control'::text) AS quality_control,
    count(*) FILTER (WHERE repair_status::text = 'Ready for Collection'::text) AS ready_for_collection,
    count(*) FILTER (WHERE repair_status::text = 'Completed'::text) AS completed,
    count(*) FILTER (WHERE repair_status::text = 'Beyond Economic Repair'::text) AS beyond_repair,
	count(*) FILTER (WHERE date_created < NOW() - INTERVAL '14 days') AS overdue_repairs
   FROM repairs WHERE assigned_to = $1`;

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

module.exports = {
  createRepair,
  getAllrepairs,
  getAllrepairsForTech,
  getRepairsStats,
  getRepairsStatsForTech,
};
