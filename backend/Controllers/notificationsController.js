require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { query } = require("../util/pg_dbConnection");
const { transporter } = require("../util/gmailTranspoter");

/*Send Email for approval request
const sendApprovalEmail = async (req, res) => {
  try {
    // const {to, device_reciever, device_reciever_userId, device_issuer, device_issuer_userId, request_date, model_name, device_serial_no } = req.body;
    const { device_issuer_userId, device_reciever_userId, request_date, model_name, device_serial_no, issuanceType } = req.body;

    //get Approver list
    const getApproverQuery = "SELECT * FROM staff WHERE userrole = 'support_admin'";
    const { rows } = await query(getApproverQuery);

    let approverList = [];
    rows.map((row) => approverList.push(row.email));

    //return res.status(200).json({ approverList, message: ``, error: true });

    if (!approverList) {
      return res.status(400).json({ message: `Email reciever not provided`, error: true });
    }

    //get issuer details
    const getIssuerQuery = "SELECT * FROM staff WHERE id = $1";
    const issuerDetails = await query(getIssuerQuery, [device_issuer_userId]);

    if (!issuerDetails) {
      return res.status(400).json({ issuerDetails, message: `iSSUER NOT FOUND`, error: true });
    }

    //get receiver details
    let getReceiverQuery;

    if (String(device_reciever_userId).length >= 6) {
      getReceiverQuery = "SELECT * FROM students WHERE student_number = $1";
    } else {
      getReceiverQuery = "SELECT * FROM staff WHERE staff_no = $1";
    }

    const recieverDetails = await query(getReceiverQuery, [device_reciever_userId]);

    if (!recieverDetails) {
      return res.status(400).json({ issuerDetails, message: `Reciever NOT FOUND`, error: true });
    }

    //get email template
    const templatePath = path.join(__dirname, "..", "util", "emailTemplates", "approvalEmail.html");
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    //Replace placeholders with actual data
    htmlContent = htmlContent
      .replace(/{{recipient_name}}/g, `${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`)
      .replace(/{{recipient_staff_no}}/g, recieverDetails.rows[0].staff_no || recieverDetails.rows[0].student_number)
      .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
      .replace(/{{issuer_staff_no}}/g, issuerDetails.rows[0].staff_no)
      .replace(/{{request_date}}/g, request_date)
      .replace(/{{model_name}}/g, model_name)
      .replace(/{{device_serial_no}}/g, device_serial_no);

    if (!htmlContent) {
      return res.status(400).json({ message: `Email template not found`, error: true });
    }

    const bannerImagePath = path.join(process.cwd(), "public", "ict_banner.png");

    if (!bannerImagePath) {
      return res.status(400).json({ message: `ICT Banner not found`, error: true });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: approverList,
      subject: `Approval Required: Laptop ${issuanceType} for ${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`,
      html: htmlContent,
      attachments: [
        {
          filename: "ict_banner.png",
          path: bannerImagePath,
          cid: "ict_banner_image", // Matches the 'src="cid:ict_banner_image"' value in your HTML
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");

    return res.status(200).json({ message: "Email sent successfully", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};*/

//Send Email for approval request
const sendApprovalEmail = async (device_serial_no, device_make, device_model, device_category, device_device_type, expected_return_date, userId, issued_by, res) => {
  try {
    // const {to, device_reciever, device_reciever_userId, device_issuer, device_issuer_userId, request_date, model_name, device_serial_no } = req.body;
    //const { device_issuer_userId, device_reciever_userId, request_date, model_name, device_serial_no, issuanceType } = req.body;

    //get Approver list
    const getApproverQuery = "SELECT * FROM staff WHERE userrole = 'support_admin'";
    const { rows } = await query(getApproverQuery);

    let approverList = [];
    rows.map((row) => approverList.push(row.email));

    //return res.status(200).json({ approverList, message: ``, error: true });

    if (!approverList) {
      return res.status(400).json({ message: `Email reciever not provided`, error: true });
    }

    //get issuer details
    const getIssuerQuery = "SELECT * FROM staff WHERE id = $1";
    const issuerDetails = await query(getIssuerQuery, [issued_by]);

    if (!issuerDetails) {
      return res.status(400).json({ issuerDetails, message: `iSSUER NOT FOUND`, error: true });
    }

    //get receiver details
    let getReceiverQuery;

    if (String(userId).length >= 6) {
      getReceiverQuery = "SELECT * FROM students WHERE student_number = $1";
    } else {
      getReceiverQuery = "SELECT * FROM staff WHERE staff_no = $1";
    }

    const recieverDetails = await query(getReceiverQuery, [userId]);

    if (!recieverDetails) {
      return res.status(400).json({ issuerDetails, message: `Reciever NOT FOUND`, error: true });
    }

    //get email template
    const templatePath = path.join(__dirname, "..", "util", "emailTemplates", "approvalEmail.html");
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    //Replace placeholders with actual data
    htmlContent = htmlContent
      .replace(/{{recipient_name}}/g, `${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`)
      .replace(/{{recipient_staff_no}}/g, recieverDetails.rows[0].staff_no || recieverDetails.rows[0].student_number)
      .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
      .replace(/{{issuer_staff_no}}/g, issuerDetails.rows[0].staff_no)
      .replace(/{{request_date}}/g, new Date().toLocaleDateString())
      .replace(/{{expected_return_date}}/g, expected_return_date ? new Date(expected_return_date).toLocaleDateString() : "N/A")
      .replace(/{{model_name}}/g, `${device_make} ${device_model}`)
      .replace(/{{device_serial_no}}/g, device_serial_no);

    if (!htmlContent) {
      return res.status(400).json({ message: `Email template not found`, error: true });
    }

    const bannerImagePath = path.join(process.cwd(), "public", "ict_banner.png");

    if (!bannerImagePath) {
      return res.status(400).json({ message: `ICT Banner not found`, error: true });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: approverList,
      subject: `Approval Required: Laptop Loan for ${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`,
      html: htmlContent,
      attachments: [
        {
          filename: "ict_banner.png",
          path: bannerImagePath,
          cid: "ict_banner_image", // Matches the 'src="cid:ict_banner_image"' value in your HTML
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return console.log("Email sent successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Send Email for approved request
const sendApprovedEmail = async (req, res) => {
  try {
    // const {to, device_reciever, device_reciever_userId, device_issuer, device_issuer_userId, request_date, model_name, device_serial_no } = req.body;
    const { device_issuer_userId, device_reciever_userId, request_date, model_name, device_serial_no, issuanceType } = req.body;

    //get Approver list
    const getApproverQuery = "SELECT * FROM staff WHERE userrole = 'support_admin'";
    const { rows } = await query(getApproverQuery);

    let approverList = [];
    rows.map((row) => approverList.push(row.email));

    //return res.status(200).json({ approverList, message: ``, error: true });

    if (!approverList) {
      return res.status(400).json({ message: `Email reciever not provided`, error: true });
    }

    //get issuer details
    const getIssuerQuery = "SELECT * FROM staff WHERE id = $1";
    const issuerDetails = await query(getIssuerQuery, [device_issuer_userId]);

    if (!issuerDetails) {
      return res.status(400).json({ issuerDetails, message: `iSSUER NOT FOUND`, error: true });
    }

    //get receiver details
    let getReceiverQuery;

    if (String(device_reciever_userId).length >= 5) {
      getReceiverQuery = "SELECT * FROM students WHERE student_number = $1";
    } else {
      getReceiverQuery = "SELECT * FROM staff WHERE staff_no = $1";
    }

    const recieverDetails = await query(getReceiverQuery, [device_reciever_userId]);

    if (!recieverDetails) {
      return res.status(400).json({ issuerDetails, message: `Reciever NOT FOUND`, error: true });
    }

    //get email template
    const templatePath = path.join(__dirname, "..", "util", "emailTemplates", "approvalEmail.html");
    let htmlContent = fs.readFileSync(templatePath, "utf8");

    //Replace placeholders with actual data
    htmlContent = htmlContent
      .replace(/{{recipient_name}}/g, `${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`)
      .replace(/{{recipient_staff_no}}/g, recieverDetails.rows[0].staff_no || recieverDetails.rows[0].student_number)
      .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
      .replace(/{{issuer_staff_no}}/g, issuerDetails.rows[0].staff_no)
      .replace(/{{request_date}}/g, request_date)
      .replace(/{{model_name}}/g, model_name)
      .replace(/{{device_serial_no}}/g, device_serial_no);

    if (!htmlContent) {
      return res.status(400).json({ message: `Email template not found`, error: true });
    }

    const bannerImagePath = path.join(process.cwd(), "public", "ict_banner.png");

    if (!bannerImagePath) {
      return res.status(400).json({ message: `ICT Banner not found`, error: true });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: approverList,
      subject: `Approval Required: Laptop ${issuanceType} for ${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`,
      html: htmlContent,
      attachments: [
        {
          filename: "ict_banner.png",
          path: bannerImagePath,
          cid: "ict_banner_image", // Matches the 'src="cid:ict_banner_image"' value in your HTML
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

module.exports = {
  sendApprovalEmail,
};
