const { query } = require("../util/pg_dbConnection");

//Create
const createEmailTemplate = async (req, res) => {
  try {
    const { name, template_content, version } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Email Name is required!" });
    }

    if (!template_content) {
      return res.status(400).json({ message: "Email content is required!" });
    }
    if (!version) {
      return res.status(400).json({ message: "Email version is required!" });
    }

    const create_query = "INSERT INTO email_templates(name, template_content, version, date_created, date_updated, is_deleted) VALUES ($1,$2,$3, NOW(),NOW(), 'False');";
    const VALUES = [name, template_content, version];

    const { rowCount } = await query(create_query, [...VALUES]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when creating Email template", error: true });
    }

    return res.status(200).json({ rowCount, message: "Successfully created", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

//get
const getEmailTemplates = async (req, res) => {
  try {
    const get_Query = `SELECT * FROM email_templates WHERE is_deleted = 'False'`;

    const { rows } = await query(get_Query);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching  Email template", error: true });
    }

    return res.status(200).json({ documents: rows, message: "Success", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//update
const updateEmailTemplate = async (req, res) => {
  try {
    const { template_id } = req.params;
    const { name, template_content, version } = req.body;

    console.log(template_id);

    //return res.status(400).json({ assetTag, make, model, serial_no, spec, category, device_condition, status, warranty_end_date, invoice_no, purchaseValue, currentValue });

    if (!name) {
      return res.status(400).json({ message: "Email Name is required!" });
    }

    if (!template_content) {
      return res.status(400).json({ message: "Email content is required!" });
    }
    if (!version) {
      return res.status(400).json({ message: "Email version is required!" });
    }

    const update_query = "UPDATE email_templates SET name=$1, template_content=$2, version=$3, date_updated=NOW() WHERE template_id = $4";
    const VALUES = [name, template_content, version];

    const { rowCount } = await query(update_query, [...VALUES, template_id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when updating Document template", error: true });
    }
    return res.status(200).json({ rowCount, message: "Successfully updated", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

//update
const deleteEmailTemplate = async (req, res) => {
  try {
    const { template_id } = req.params;

    const get_Query = `SELECT * FROM email_templates WHERE template_id = $1`;

    const { rows } = await query(get_Query, [document_id]);

    if (!rows) {
      return res.status(400).json({ message: " Document template not found", error: true });
    }

    const update_query = "UPDATE email_templates SET is_deleted ='True', date_updated=NOW() WHERE template_id = $1";

    const { rowCount } = await query(update_query, [template_id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when deleting Document template", error: true });
    }
    return res.status(200).json({ rowCount, message: "Successfully deleted", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

module.exports = { createEmailTemplate, getEmailTemplates, updateEmailTemplate, deleteEmailTemplate };
