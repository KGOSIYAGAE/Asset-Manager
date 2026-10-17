const { query } = require("../util/pg_dbConnection");
require("dotenv").config();
const { encrypt, decrypt } = require("../util/cryptoHelper");

//get Config Helper
const getConfig = async (req, res) => {
  try {
    const get_Query = `SELECT * FROM graph_app_config`;

    const { rows } = await query(get_Query);

    if (!rows) {
      return console.log({ message: "An error occured fetching Azure Graph Config", error: true });
    }

    //Secret decrepting
    const decreptedSecret = decrypt(rows[0].client_secret, process.env.SECRET_KEY);

    return { ds: decreptedSecret, config: rows };
  } catch (error) {
    return console.log({ message: `Internal server error: ${error}`, error: true });
  }
};

//Create
const createAzureGraphConfig = async (req, res) => {
  try {
    const { clientId, tenantId, clientSecret, scopes, senderEmail } = req.body;

    //return res.status(400).json({ assetTag, make, model, serial_no, spec, category, device_condition, status, warranty_end_date, invoice_no, purchaseValue, currentValue });

    if (!clientId) {
      return res.status(400).json({ message: "Client ID is required!" });
    }
    if (!tenantId) {
      return res.status(400).json({ message: "Tenant ID is required!" });
    }
    if (!clientSecret) {
      return res.status(400).json({ message: "Client Secret is required!" });
    }
    if (!scopes) {
      return res.status(400).json({ message: "Scope is required!" });
    }
    if (!senderEmail) {
      return res.status(400).json({ message: "Sender Email is required!" });
    }

    //Secret encrypting
    const hash_secret = encrypt(clientSecret, process.env.SECRET_KEY);

    const create_query =
      "INSERT INTO graph_app_config(client_id, tenant_id, client_secret, scopes, sender_email, environment, date_created,date_updated, is_deleted, is_secret_set) VALUES ($1,$2,$3,$4,$5,'Production', NOW(),NOW(), 'False','True');";
    const VALUES = [clientId, tenantId, hash_secret, scopes, senderEmail];

    const { rowCount } = await query(create_query, [...VALUES]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when creating Azure Graph Config", error: true });
    }

    return res.status(200).json({ rowCount, message: "Successfully created", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

//get AzureGraphConfig
const getAzureGraphConfig = async (req, res) => {
  try {
    const get_Query = `SELECT * FROM graph_app_config`;

    const { rows } = await query(get_Query);

    if (!rows) {
      return res.status(400).json({ message: "An error occured fetching Azure Graph Config", error: true });
    }

    console.log();

    return res.status(200).json({
      config: { configId: rows[0].config_id, clientId: rows[0].client_id, tenantId: rows[0].tenant_id, scopes: rows[0].scopes, senderEmail: rows[0].sender_email, isSecretSet: rows[0].is_secret_set },
      message: "Success",
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Create
const updateAzureGraphConfig = async (req, res) => {
  try {
    const { config_id } = req.params;
    const { clientId, tenantId, clientSecret, scopes, senderEmail } = req.body;

    if (!clientId) {
      return res.status(400).json({ message: "Client ID is required!" });
    }
    if (!tenantId) {
      return res.status(400).json({ message: "Tenant ID is required!" });
    }

    if (!scopes) {
      return res.status(400).json({ message: "Scope is required!" });
    }
    if (!senderEmail) {
      return res.status(400).json({ message: "Sender Email is required!" });
    }

    let update_query;
    let VALUES = [];

    if (clientSecret) {
      //Secret encrypting
      const hash_secret = encrypt(clientSecret, process.env.SECRET_KEY);

      update_query = "UPDATE graph_app_config SET client_id=$1, tenant_id=$2, client_secret=$3, scopes=$4, sender_email=$5, is_secret_set='True', date_updated=NOW() WHERE config_id = $6";
      VALUES.push(clientId, tenantId, hash_secret, scopes, senderEmail);
    } else {
      update_query = "UPDATE graph_app_config SET client_id=$1, tenant_id=$2, scopes=$3, sender_email=$4, is_secret_set='True', date_updated=NOW() WHERE config_id = $5";
      VALUES.push(clientId, tenantId, scopes, senderEmail);
    }

    const { rowCount } = await query(update_query, [...VALUES, config_id]);

    if (rowCount <= 0) {
      return res.status(400).json({ message: "An error occured when creating Azure Graph Config", error: true });
    }

    return res.status(200).json({ rowCount, message: "Successfully created", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

module.exports = { createAzureGraphConfig, getAzureGraphConfig, getConfig, updateAzureGraphConfig };
