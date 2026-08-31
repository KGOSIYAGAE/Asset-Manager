require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { query } = require("../util/pg_dbConnection");
const { transporter } = require("../util/gmailTranspoter");
const { sendEmail } = require("../util/azureGraphConnection");

//Send Email for approval request
const sendApprovalEmail = async (req, res) => {
  try {
    // const {to, device_reciever, device_reciever_userId, device_issuer, device_issuer_userId, request_date, model_name, device_serial_no } = req.body;
    const { device_issuer_userId, device_reciever_userId, request_date, model_name, device_serial_no, issuanceType, expected_return_date } = req.body;

    //get Approver list
    const getApproverQuery = "SELECT * FROM staff WHERE userrole = 'support_admin'";
    const { rows } = await query(getApproverQuery);

    let approverList = [];
    rows.map((row) => approverList.push(row.email));

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
    let templatePath;
    let htmlContent;

    if (issuanceType === "Loan") {
      templatePath = path.join(__dirname, "..", "util", "emailTemplates", "LoanApprovalEmailTemplate.html");
      htmlContent = fs.readFileSync(templatePath, "utf8");

      //Replace placeholders with actual data
      htmlContent = htmlContent
        .replace(/{{recipient_name}}/g, `${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, recieverDetails.rows[0].staff_no || recieverDetails.rows[0].student_number)
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{issuer_staff_no}}/g, issuerDetails.rows[0].staff_no)
        .replace(/{{request_date}}/g, request_date)
        .replace(/{{expected_return_date}}/g, expected_return_date)
        .replace(/{{model_name}}/g, model_name)
        .replace(/{{device_serial_no}}/g, device_serial_no);
    } else {
      templatePath = path.join(__dirname, "..", "util", "emailTemplates", "IssueApprovalEmailTemplate.html");
      htmlContent = fs.readFileSync(templatePath, "utf8");

      //Replace placeholders with actual data
      htmlContent = htmlContent
        .replace(/{{recipient_name}}/g, `${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, recieverDetails.rows[0].staff_no || recieverDetails.rows[0].student_number)
        .replace(/{{contract_type}}/g, recieverDetails.rows[0].contract_type || "N/A")
        .replace(/{{end_date}}/g, recieverDetails.rows[0].end_date || "N/A")
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{issuer_staff_no}}/g, issuerDetails.rows[0].staff_no)
        .replace(/{{request_date}}/g, request_date)
        .replace(/{{model_name}}/g, model_name)
        .replace(/{{device_serial_no}}/g, device_serial_no);
    }

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

    await sendEmail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully", error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Internal server error: ${error}`, error: true });
  }
};

//Send Email for approved request
const sendApprovedEmail = async (approved_by, deviceTransactionId, device, res) => {
  try {
    //get Approver list
    const getApprover = "SELECT * FROM staff WHERE id =$1";
    const approverDetails = await query(getApprover, [approved_by]);

    if (!approverDetails.rows) {
      return res.status(400).json({ message: `Approver not provided`, error: true });
    }

    //get transaction details
    const getTransactionDetails = "SELECT * FROM device_transactions WHERE id =$1";
    const transactionDetails = await query(getTransactionDetails, [deviceTransactionId]);

    if (!transactionDetails.rows) {
      return res.status(400).json({ message: `Transaction not provided`, error: true });
    }

    //get issuer details
    const getIssuerQuery = "SELECT * FROM staff WHERE id = $1";
    const issuerDetails = await query(getIssuerQuery, [transactionDetails.rows[0].issued_by]);

    if (!issuerDetails) {
      return res.status(400).json({ issuerDetails, message: `iSSUER NOT FOUND`, error: true });
    }

    //get receiver details
    let getReceiverQuery;

    if (String(transactionDetails.rows[0].user_id).length >= 6) {
      getReceiverQuery = "SELECT * FROM students WHERE student_number = $1";
    } else {
      getReceiverQuery = "SELECT * FROM staff WHERE staff_no = $1";
    }

    const recieverDetails = await query(getReceiverQuery, [transactionDetails.rows[0].user_id]);

    if (!recieverDetails) {
      return res.status(400).json({ issuerDetails, message: `Reciever NOT FOUND`, error: true });
    }

    //get email template
    let templatePath;
    let htmlContent;
    let subject;

    if (device.status === "Loan Approval required") {
      templatePath = path.join(__dirname, "..", "util", "emailTemplates", "LoanApprovedEmailTemplate.html");
      htmlContent = fs.readFileSync(templatePath, "utf8");

      //Replace placeholders with actual data
      htmlContent = htmlContent
        .replace(/{{recipient_name}}/g, `${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, recieverDetails.rows[0].staff_no || recieverDetails.rows[0].student_number)
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{expected_return_date}}/g, new Date(transactionDetails.rows[0].expected_return_date).toLocaleDateString())
        .replace(/{{approver_name}}/g, `${approverDetails.rows[0].name} ${approverDetails.rows[0].surname}`)
        .replace(/{{model_name}}/g, `${device.make} ${device.model}`)
        .replace(/{{device_serial_no}}/g, device.serial_no);

      subject = `Loan Approved: Device Loan for ${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`;
    } else {
      templatePath = path.join(__dirname, "..", "util", "emailTemplates", "IssueApprovedEmailTemplate.html");
      htmlContent = fs.readFileSync(templatePath, "utf8");

      //Replace placeholders with actual data
      //Replace placeholders with actual data
      htmlContent = htmlContent
        .replace(/{{recipient_name}}/g, `${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, recieverDetails.rows[0].staff_no || recieverDetails.rows[0].student_number)
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{approver_name}}/g, `${approverDetails.rows[0].name} ${approverDetails.rows[0].surname}`)
        .replace(/{{model_name}}/g, `${device.make} ${device.model}`)
        .replace(/{{device_serial_no}}/g, device.serial_no);

      subject = `Issue Approved: Device Issue for ${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`;
    }

    if (!htmlContent) {
      return res.status(400).json({ message: `Email template not found`, error: true });
    }

    const bannerImagePath = path.join(process.cwd(), "public", "ict_banner.png");

    if (!bannerImagePath) {
      return res.status(400).json({ message: `ICT Banner not found`, error: true });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [issuerDetails.rows[0].email],
      subject: subject,
      html: htmlContent,
      attachments: [
        {
          filename: "ict_banner.png",
          path: bannerImagePath,
          cid: "ict_banner_image", // Matches the 'src="cid:ict_banner_image"' value in your HTML
        },
      ],
    };

    await sendEmail(mailOptions);

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Send Email for approved request
const sendRejectionEmail = async (rejected_by, deviceTransactionId, device, rejectReason, res) => {
  try {
    //get Approver list
    const getApprover = "SELECT * FROM staff WHERE id =$1";
    const approverDetails = await query(getApprover, [rejected_by]);

    if (!approverDetails.rows) {
      return res.status(400).json({ message: `Approver not provided`, error: true });
    }

    //get transaction details
    const getTransactionDetails = "SELECT * FROM device_transactions WHERE id =$1";
    const transactionDetails = await query(getTransactionDetails, [deviceTransactionId]);

    if (!transactionDetails.rows) {
      return res.status(400).json({ message: `Transaction not provided`, error: true });
    }

    //get issuer details
    const getIssuerQuery = "SELECT * FROM staff WHERE id = $1";
    const issuerDetails = await query(getIssuerQuery, [transactionDetails.rows[0].issued_by]);

    if (!issuerDetails) {
      return res.status(400).json({ issuerDetails, message: `iSSUER NOT FOUND`, error: true });
    }

    //get receiver details
    let getReceiverQuery;

    if (String(transactionDetails.rows[0].user_id).length >= 6) {
      getReceiverQuery = "SELECT * FROM students WHERE student_number = $1";
    } else {
      getReceiverQuery = "SELECT * FROM staff WHERE staff_no = $1";
    }

    const recieverDetails = await query(getReceiverQuery, [transactionDetails.rows[0].user_id]);

    if (!recieverDetails) {
      return res.status(400).json({ issuerDetails, message: `Reciever NOT FOUND`, error: true });
    }

    //get email template
    let templatePath;
    let htmlContent;
    let subject;

    if (transactionDetails.rows[0].status === "Rejected" && transactionDetails.rows[0].expected_return_date) {
      templatePath = path.join(__dirname, "..", "util", "emailTemplates", "LoanRejectionEmailTemplate.html");
      htmlContent = fs.readFileSync(templatePath, "utf8");

      //Replace placeholders with actual data
      htmlContent = htmlContent
        .replace(/{{recipient_name}}/g, `${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, recieverDetails.rows[0].staff_no || recieverDetails.rows[0].student_number)
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{expected_return_date}}/g, new Date(transactionDetails.rows[0].expected_return_date).toLocaleDateString())
        .replace(/{{approver_name}}/g, `${approverDetails.rows[0].name} ${approverDetails.rows[0].surname}`)
        .replace(/{{model_name}}/g, `${device.make} ${device.model}`)
        .replace(/{{device_serial_no}}/g, device.serial_no)
        .replace(/{{rejection_reason}}/g, rejectReason);

      subject = `Loan Rejected: Device Loan for ${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`;
    } else {
      templatePath = path.join(__dirname, "..", "util", "emailTemplates", "IssueRejectionEmailTemplate.html");
      htmlContent = fs.readFileSync(templatePath, "utf8");

      //Replace placeholders with actual data
      //Replace placeholders with actual data
      htmlContent = htmlContent
        .replace(/{{recipient_name}}/g, `${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, recieverDetails.rows[0].staff_no || recieverDetails.rows[0].student_number)
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{approver_name}}/g, `${approverDetails.rows[0].name} ${approverDetails.rows[0].surname}`)
        .replace(/{{model_name}}/g, `${device.make} ${device.model}`)
        .replace(/{{device_serial_no}}/g, device.serial_no)
        .replace(/{{rejection_reason}}/g, rejectReason);

      subject = `Issue Rejected: Device Issue for ${recieverDetails.rows[0].name} ${recieverDetails.rows[0].surname}`;
    }

    if (!htmlContent) {
      return res.status(400).json({ message: `Email template not found`, error: true });
    }

    const bannerImagePath = path.join(process.cwd(), "public", "ict_banner.png");

    if (!bannerImagePath) {
      return res.status(400).json({ message: `ICT Banner not found`, error: true });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [issuerDetails.rows[0].email],
      subject: subject,
      html: htmlContent,
      attachments: [
        {
          filename: "ict_banner.png",
          path: bannerImagePath,
          cid: "ict_banner_image", // Matches the 'src="cid:ict_banner_image"' value in your HTML
        },
      ],
    };

    await sendEmail(mailOptions);

    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

///Test Email controller
const testEmail = async (req, res) => {
  try {
    await sendEmail();

    res.json({
      success: true,
      message: "Email sent!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  sendApprovalEmail,
  sendApprovedEmail,
  sendRejectionEmail,
  testEmail,
};
