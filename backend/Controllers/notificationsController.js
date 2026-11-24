require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { query } = require("../util/pg_dbConnection");
const { transporter } = require("../util/gmailTranspoter");
const { sendEmail } = require("../util/azureGraphConnection");
const puppeteer = require("puppeteer");
const { getIssuerAndreturnerAndApproverSignatures, getIssuerAndreturnerAndApproverSignaturesHelper } = require("./signatureController");
const { handleTimeStampToText, getTodayDate } = require("../util/HelperMethods");
const { getDocumentTemplateHelper } = require("./documentTemplateController");
const { getEmailTemplatesHelper } = require("./emailTemplateController");

/*const f = await getDocumentTemplateHelper(formType);

  let documentTemplate = f.documents[0].template_content;*/

//Send Email for approval request
/*const sendApprovalEmail = async (req, res) => {
  try {
    // const {to, device_reciever, device_reciever_userId, device_issuer, device_issuer_userId, request_date, model_name, serial_no } = req.body;

    const { deviceId, device_issuer_userId, device_reciever_userId, request_date, model_name, serial_no, issuanceType, expected_return_date } = req.body;

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

    const userDetails = await query(getReceiverQuery, [device_reciever_userId]);

    if (!userDetails) {
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
        .replace(/{{recipient_name}}/g, `${userDetails.rows[0].name} ${userDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, userDetails.rows[0].staff_no || userDetails.rows[0].student_number)
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{issuer_staff_no}}/g, issuerDetails.rows[0].staff_no)
        .replace(/{{request_date}}/g, request_date)
        .replace(/{{expected_return_date}}/g, expected_return_date)
        .replace(/{{model_name}}/g, model_name)
        .replace(/{{serial_no}}/g, serial_no)
        .replace(/{{url_link}}/g, `http://10.10.4.186/devices/device-details/${deviceId}`);
    } else {
      templatePath = path.join(__dirname, "..", "util", "emailTemplates", "IssueApprovalEmailTemplate.html");
      htmlContent = fs.readFileSync(templatePath, "utf8");

      //Replace placeholders with actual data
      htmlContent = htmlContent
        .replace(/{{recipient_name}}/g, `${userDetails.rows[0].name} ${userDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, userDetails.rows[0].staff_no || userDetails.rows[0].student_number)
        .replace(/{{contract_type}}/g, userDetails.rows[0].contract_type || "N/A")
        .replace(/{{end_date}}/g, userDetails.rows[0].end_date || "N/A")
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{issuer_staff_no}}/g, issuerDetails.rows[0].staff_no)
        .replace(/{{request_date}}/g, request_date)
        .replace(/{{model_name}}/g, model_name)
        .replace(/{{serial_no}}/g, serial_no)
        .replace(/{{url_link}}/g, `http://10.10.4.186/devices/device-details/${deviceId}`);
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
      subject: `Approval Required: Laptop ${issuanceType} for ${userDetails.rows[0].name} ${userDetails.rows[0].surname}`,
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
};*/

//Send Email for approval request
const sendApprovalEmail = async (issued_by, userId, device, expected_return_date, issuanceType, res) => {
  try {
    // const {to, device_reciever, device_reciever_userId, device_issuer, device_issuer_userId, request_date, model_name, serial_no } = req.body;

    //const { deviceId, device_issuer_userId, device_reciever_userId, request_date, model_name, serial_no, issuanceType, expected_return_date } = req.body;

    if (!issued_by || !userId || !device || !issuanceType) {
      return res.status(400).json({ message: "All field must be provided.", error: true });
    }

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

    const userDetails = await query(getReceiverQuery, [userId]);

    if (!userDetails) {
      return res.status(400).json({ issuerDetails, message: `Reciever NOT FOUND`, error: true });
    }

    //get email template
    let templatePath;
    let htmlContent;
    let emailTemplate;

    const request_date = getTodayDate();

    if (issuanceType === "Loan") {
      const emailTemp = await getEmailTemplatesHelper("Loan-Approval");
      emailTemplate = emailTemp.template[0].template_content;

      //templatePath = path.join(__dirname, "..", "util", "emailTemplates", "LoanApprovalEmailTemplate.html");
      //htmlContent = fs.readFileSync(templatePath, "utf8");

      //Replace placeholders with actual data
      emailTemplate = emailTemplate
        .replace(/{{recipient_name}}/g, `${userDetails.rows[0].name} ${userDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, userDetails.rows[0].staff_no || userDetails.rows[0].student_number)
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{issuer_staff_no}}/g, issuerDetails.rows[0].staff_no)
        .replace(/{{request_date}}/g, request_date)
        .replace(/{{expected_return_date}}/g, handleTimeStampToText(expected_return_date))
        .replace(/{{make}}/g, device.make)
        .replace(/{{model}}/g, device.model)
        .replace(/{{serial_no}}/g, device.serial_no)
        .replace(/{{device_id}}/g, device.id);
    } else {
      //templatePath = path.join(__dirname, "..", "util", "emailTemplates", "IssueApprovalEmailTemplate.html");
      //htmlContent = fs.readFileSync(templatePath, "utf8");

      const emailTemp = await getEmailTemplatesHelper("Issue-Approval");
      emailTemplate = emailTemp.template[0].template_content;

      //Replace placeholders with actual data
      emailTemplate = emailTemplate
        .replace(/{{recipient_name}}/g, `${userDetails.rows[0].name} ${userDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, userDetails.rows[0].staff_no || userDetails.rows[0].student_number)
        .replace(/{{contract_type}}/g, userDetails.rows[0].contract_type || "N/A")
        .replace(/{{end_date}}/g, userDetails.rows[0].end_date || "N/A")
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{issuer_staff_no}}/g, issuerDetails.rows[0].staff_no)
        .replace(/{{request_date}}/g, request_date)
        .replace(/{{make}}/g, device.make)
        .replace(/{{model}}/g, device.model)
        .replace(/{{serial_no}}/g, device.serial_no)
        .replace(/{{device_id}}/g, device.id);
    }

    if (!emailTemplate) {
      return res.status(400).json({ message: `Email template not found`, error: true });
    }

    const bannerImagePath = path.join(process.cwd(), "public", "ict_banner.png");

    if (!bannerImagePath) {
      return res.status(400).json({ message: `ICT Banner not found`, error: true });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: approverList,
      subject: `Approval Required: Laptop ${issuanceType} for ${userDetails.rows[0].name} ${userDetails.rows[0].surname}`,
      html: emailTemplate,
      attachments: [
        {
          filename: "ict_banner.png",
          path: bannerImagePath,
          cid: "ict_banner_image", // Matches the 'src="cid:ict_banner_image"' value in your HTML
        },
      ],
    };

    await sendEmail(mailOptions);

    return { message: "Email sent successfully. Device state has been changed, Approval is required", error: false };
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

    const userDetails = await query(getReceiverQuery, [transactionDetails.rows[0].user_id]);

    if (!userDetails) {
      return res.status(400).json({ issuerDetails, message: `Reciever NOT FOUND`, error: true });
    }

    //get email template
    let templatePath;
    let htmlContent;
    let subject;
    let emailTemplate;

    if (device.status === "Loan Approval required") {
      //templatePath = path.join(__dirname, "..", "util", "emailTemplates", "LoanApprovedEmailTemplate.html");
      //htmlContent = fs.readFileSync(templatePath, "utf8");

      const emailTemp = await getEmailTemplatesHelper("Loan-Approved");
      emailTemplate = emailTemp.template[0].template_content;

      //Replace placeholders with actual data
      emailTemplate = emailTemplate
        .replace(/{{recipient_name}}/g, `${userDetails.rows[0].name} ${userDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, userDetails.rows[0].staff_no || userDetails.rows[0].student_number)
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{expected_return_date}}/g, new Date(transactionDetails.rows[0].expected_return_date).toLocaleDateString())
        .replace(/{{approver_name}}/g, `${approverDetails.rows[0].name} ${approverDetails.rows[0].surname}`)
        .replace(/{{make}}/g, device.make)
        .replace(/{{model}}/g, device.model)
        .replace(/{{serial_no}}/g, device.serial_no)
        .replace(/{{device_id}}/g, device.id);

      subject = `Loan Approved: Device Loan for ${userDetails.rows[0].name} ${userDetails.rows[0].surname}`;
    } else {
      //templatePath = path.join(__dirname, "..", "util", "emailTemplates", "IssueApprovedEmailTemplate.html");
      //htmlContent = fs.readFileSync(templatePath, "utf8");

      const emailTemp = await getEmailTemplatesHelper("Issue-Approved");
      emailTemplate = emailTemp.template[0].template_content;

      //Replace placeholders with actual data
      //Replace placeholders with actual data
      emailTemplate = emailTemplate
        .replace(/{{recipient_name}}/g, `${userDetails.rows[0].name} ${userDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, userDetails.rows[0].staff_no || userDetails.rows[0].student_number)
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{approver_name}}/g, `${approverDetails.rows[0].name} ${approverDetails.rows[0].surname}`)
        .replace(/{{make}}/g, device.make)
        .replace(/{{model}}/g, device.model)
        .replace(/{{serial_no}}/g, device.serial_no)
        .replace(/{{device_id}}/g, device.id);

      subject = `Issue Approved: Device Issue for ${userDetails.rows[0].name} ${userDetails.rows[0].surname}`;
    }

    if (!emailTemplate) {
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
      html: emailTemplate,
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

    const userDetails = await query(getReceiverQuery, [transactionDetails.rows[0].user_id]);

    if (!userDetails) {
      return res.status(400).json({ issuerDetails, message: `Reciever NOT FOUND`, error: true });
    }

    //get email template
    let templatePath;
    let htmlContent;
    let subject;
    let emailTemplate;

    if (transactionDetails.rows[0].status === "Rejected" && transactionDetails.rows[0].expected_return_date) {
      //templatePath = path.join(__dirname, "..", "util", "emailTemplates", "LoanRejectionEmailTemplate.html");
      //htmlContent = fs.readFileSync(templatePath, "utf8");

      const emailTemp = await getEmailTemplatesHelper("Loan-Rejection");
      emailTemplate = emailTemp.template[0].template_content;

      //Replace placeholders with actual data
      emailTemplate = emailTemplate
        .replace(/{{recipient_name}}/g, `${userDetails.rows[0].name} ${userDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, userDetails.rows[0].staff_no || userDetails.rows[0].student_number)
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{expected_return_date}}/g, new Date(transactionDetails.rows[0].expected_return_date).toLocaleDateString())
        .replace(/{{approver_name}}/g, `${approverDetails.rows[0].name} ${approverDetails.rows[0].surname}`)
        .replace(/{{make}}/g, device.make)
        .replace(/{{model}}/g, device.model)
        .replace(/{{serial_no}}/g, device.serial_no)
        .replace(/{{rejection_reason}}/g, rejectReason);

      subject = `Loan Rejected: Device Loan for ${userDetails.rows[0].name} ${userDetails.rows[0].surname}`;
    } else {
      //templatePath = path.join(__dirname, "..", "util", "emailTemplates", "IssueRejectionEmailTemplate.html");
      //htmlContent = fs.readFileSync(templatePath, "utf8");

      const emailTemp = await getEmailTemplatesHelper("Issue-Rejection");
      emailTemplate = emailTemp.template[0].template_content;

      //Replace placeholders with actual data
      //Replace placeholders with actual data
      emailTemplate = emailTemplate
        .replace(/{{recipient_name}}/g, `${userDetails.rows[0].name} ${userDetails.rows[0].surname}`)
        .replace(/{{recipient_staff_no}}/g, userDetails.rows[0].staff_no || userDetails.rows[0].student_number)
        .replace(/{{issuer_name}}/g, `${issuerDetails.rows[0].name} ${issuerDetails.rows[0].surname}`)
        .replace(/{{approver_name}}/g, `${approverDetails.rows[0].name} ${approverDetails.rows[0].surname}`)
        .replace(/{{make}}/g, device.make)
        .replace(/{{model}}/g, device.model)
        .replace(/{{serial_no}}/g, device.serial_no)
        .replace(/{{rejection_reason}}/g, rejectReason);

      subject = `Issue Rejected: Device Issue for ${userDetails.rows[0].name} ${userDetails.rows[0].surname}`;
    }

    if (!emailTemplate) {
      return console.log({ message: `Email template not found`, error: true });
    }

    const bannerImagePath = path.join(process.cwd(), "public", "ict_banner.png");

    if (!bannerImagePath) {
      return console.log({ message: `ICT Banner not found`, error: true });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [issuerDetails.rows[0].email],
      subject: subject,
      html: emailTemplate,
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

const generatePdf = async (formContent) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  console.log("Browser launched");

  try {
    const page = await browser.newPage();

    //Build / Render form HTML here
    await page.setContent(formContent, {
      waitUntil: "networkidle0",
    });

    console.log("Content set");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    console.log("PDF generated:");
    console.log("Buffer:", Buffer.isBuffer(pdfBuffer));
    console.log("Size:", pdfBuffer.length);

    return pdfBuffer;
  } finally {
    await browser.close();
  }
};

//Send Email form via Email
const sendFormViaEmail = async (req, res) => {
  const { user_id, device_id, formType, emailReciever } = req.body;

  //console.log(user_id, device_id, formType, ...emailReciever);

  if (!user_id || !device_id || !formType || !emailReciever) {
    return res.status(400).json({ message: `All Details must be provided`, error: true });
  }

  const pdfTemlateDoc = await getDocumentTemplateHelper(formType);
  let documentTemplate = pdfTemlateDoc.documents[0]?.template_content;

  const emailTemp = await getEmailTemplatesHelper("Send-Form");
  let emailTemplate = emailTemp.template[0].template_content;

  try {
    //Get Device Details
    const getDeviceDetailsQuery = `SELECT * FROM "deviceUserDetails" WHERE id = $1;`;
    const deviceDetails = await query(getDeviceDetailsQuery, [device_id]);

    //get receiver details
    let getUserQuery;

    if (String(user_id).length >= 6) {
      getUserQuery = `SELECT * FROM "studentDetails" WHERE student_number = $1`;
    } else {
      getUserQuery = `SELECT * FROM "StaffDetails" WHERE staff_no = $1`;
    }

    const userDetails = await query(getUserQuery, [user_id]);

    if (!userDetails) {
      return res.status(400).json({ message: `User NOT FOUND`, error: true });
    }

    //Get Issuer & Approver
    let signatureResponses;
    if (deviceDetails.rows[0].status === "Assigned" || deviceDetails.rows[0].status === "Loaned") {
      signatureResponses = await getIssuerAndreturnerAndApproverSignaturesHelper(deviceDetails.rows[0].serial_no, deviceDetails.rows[0].status);
    } else {
      signatureResponses = await getIssuerAndreturnerAndApproverSignaturesHelper(deviceDetails.rows[0].serial_no, "Returned");
    }

    /*return res.status(200).json({
      success: true,
     userDetails:userDetails
    });*/

    //get email template
    let htmlContent;
    let subject;
    let pdfBuffer;

    if (formType === "Student-Issue") {
      //templatePath = path.join(__dirname, "..", "util", "emailTemplates", "sendFormEmailTemplate.html");
      //htmlContent = fs.readFileSync(templatePath, "utf8");

      emailTemplate = emailTemplate
        .replace(/{{recipient_name}}/g, `${userDetails.rows[0].name} ${userDetails.rows[0].surname}`)
        .replace(/{{form_type}}/g, "issued to you")
        .replace(/{{title}}/g, `Asset Issue Form`);

      /* templatePdf = path.join(__dirname, "..", "util", "pdfTemplates", "Student_AOD_PDF_Template.html");
      pdfContent = fs.readFileSync(templatePdf, "utf8");*/

      const logoPath = path.join(process.cwd(), "public", "SPU_logo.png");
      const bannerImagePath = path.join(process.cwd(), "public", "ict_banner.png");

      if (!logoPath) {
        return res.status(400).json({ message: `SPU Logo not found`, error: true });
      }

      const logoBase64 = fs.readFileSync(logoPath).toString("base64");

      const spuLogo = `data:image/jpeg;base64,${logoBase64}`;

      const replacements = {
        spu_logo: spuLogo || "",
        name: userDetails.rows[0].name || "",
        surname: userDetails.rows[0].surname || "",
        course_code: userDetails.rows[0].course_code || "",
        course_name: userDetails.rows[0].course_name || "",
        student_number: userDetails.rows[0].student_number || "",
        phone_number: userDetails.rows[0].phone_number || "",
        id_number: userDetails.rows[0].id_number || "",
        purchase_price: deviceDetails.rows[0].purchase_price || "",

        make: deviceDetails.rows[0].make || "",
        model: deviceDetails.rows[0].model || "",
        serial_number: deviceDetails.rows[0].serial_no || "",

        issue_date: deviceDetails.rows[0].issue_date || "",
        year: new Date().getFullYear(),

        student_signature: userDetails.rows[0].student_signature || "",
        issuerfullname: signatureResponses[0].issuerfullname || "",
        issuersignature: signatureResponses[0].issuersignature || "",
        approverfullname: signatureResponses[0].approverfullname || "",
        approversignature: signatureResponses[0].approversignature || "",
      };

      documentTemplate = documentTemplate.replace(/{{(\w+)}}/g, (match, key) => replacements[key] ?? "");

      pdfBuffer = await generatePdf(documentTemplate);

      subject = `Asset Issue Form - ${userDetails.rows[0].name} ${userDetails.rows[0].surname}`;
    } else if (formType === "Staff-Issue") {
      //templatePath = path.join(__dirname, "..", "util", "emailTemplates", "sendFormEmailTemplate.html");
      //htmlContent = fs.readFileSync(templatePath, "utf8");

      emailTemplate = emailTemplate
        .replace(/{{recipient_name}}/g, `${userDetails.rows[0].name} ${userDetails.rows[0].surname}`)
        .replace(/{{form_type}}/g, "issued to you")
        .replace(/{{title}}/g, `Asset Issue Form`);

      //templatePdf = path.join(__dirname, "..", "util", "pdfTemplates", "Staff-Issue-Form-PDF-Template.html");
      //pdfContent = fs.readFileSync(templatePdf, "utf8");

      const logoPath = path.join(process.cwd(), "public", "SPU_logo.png");
      const bannerImagePath = path.join(process.cwd(), "public", "ict_banner.png");

      if (!logoPath) {
        return res.status(400).json({ message: `SPU Logo not found`, error: true });
      }

      const logoBase64 = fs.readFileSync(logoPath).toString("base64");

      const spuLogo = `data:image/jpeg;base64,${logoBase64}`;

      /* pdfContent = pdfContent
        .replace(/{{spu_logo}}/g, spuLogo)
        .replace(/{{student_name}}/g, userDetails.rows[0].name)
        .replace(/{{student_surname}}/g, userDetails.rows[0].surname)
        .replace(/{{course_code}}/g, userDetails.rows[0].course_code)
        .replace(/{{course_name}}/g, userDetails.rows[0].course_name)
        .replace(/{{student_number}}/g, userDetails.rows[0].student_number)
        .replace(/{{phone_number}}/g, userDetails.rows[0].phone_number)
        .replace(/{{id_number}}/g, userDetails.rows[0].id_number)
        .replace(/{{purchase_price}}/g, deviceDetails.rows[0].purchase_price)
        .replace(/{{make}}/g, deviceDetails.rows[0].make)
        .replace(/{{model}}/g, deviceDetails.rows[0].model)
        .replace(/{{serial_number}}/g, deviceDetails.rows[0].serial_no)
        .replace(/{{issue_date}}/g, deviceDetails.rows[0].issue_date)
        .replace(/{{approver_signature}}/g, signatureResponses.approverSignature)
        .replace(/{{student_signature}}/g, userDetails.rows[0].image_base64)
        .replace(/{{issuer_signature}}/g, signatureResponses.issuerSignature);*/

      const bannerPath = path.join(process.cwd(), "public", "page_banner.png");

      const pageBanner = `data:image/png;base64,${fs.readFileSync(bannerPath).toString("base64")}`;

      const replacements = {
        spu_logo: spuLogo,
        page_banner: pageBanner,

        category: deviceDetails.rows[0].category || "",
        make: deviceDetails.rows[0].make || "",
        model: deviceDetails.rows[0].model || "",
        serial_no: deviceDetails.rows[0].serial_no || "",
        asset_tag: deviceDetails.rows[0].asset_tag || "",

        name: userDetails.rows[0].name || "",
        surname: userDetails.rows[0].surname || "",
        staff_no: userDetails.rows[0].staff_no || "",
        faculty_name: userDetails.rows[0].faculty_name || "",
        department_name: userDetails.rows[0].department_name || "",
        post_name: userDetails.rows[0].post_name || "",
        phone_number: userDetails.rows[0].phone_number || "",
        issue_date: deviceDetails.rows[0].issue_date || "",

        staff_signature: userDetails.rows[0].staff_signature || "",
        issuerfullname: signatureResponses[0].issuerfullname || "",
        issuersignature: signatureResponses[0].issuersignature || "",
        approverfullname: signatureResponses[0].approverfullname || "",
        approversignature: signatureResponses[0].approversignature || "",
      };

      documentTemplate = documentTemplate.replace(/{{(\w+)}}/g, (match, key) => replacements[key] ?? "");

      pdfBuffer = await generatePdf(documentTemplate);

      subject = `Asset Issue Form - ${userDetails.rows[0].name} ${userDetails.rows[0].surname}`;
    } else if (formType === "Return-form") {
      //templatePath = path.join(__dirname, "..", "util", "emailTemplates", "sendFormEmailTemplate.html");
      //htmlContent = fs.readFileSync(templatePath, "utf8");

      emailTemplate = emailTemplate
        .replace(/{{recipient_name}}/g, `${userDetails.rows[0].name} ${userDetails.rows[0].surname}`)
        .replace(/{{form_type}}/g, "returned by you")
        .replace(/{{title}}/g, `Asset Return Form`);

      /*templatePdf = path.join(__dirname, "..", "util", "pdfTemplates", "Return-Form-PDF-Template.html");
      pdfContent = fs.readFileSync(templatePdf, "utf8");*/

      const logoPath = path.join(process.cwd(), "public", "SPU_logo.png");
      const bannerImagePath = path.join(process.cwd(), "public", "ict_banner.png");

      if (!logoPath) {
        return res.status(400).json({ message: `SPU Logo not found`, error: true });
      }

      const logoBase64 = fs.readFileSync(logoPath).toString("base64");

      const spuLogo = `data:image/jpeg;base64,${logoBase64}`;

      const bannerPath = path.join(process.cwd(), "public", "page_banner.png");

      const pageBanner = `data:image/png;base64,${fs.readFileSync(bannerPath).toString("base64")}`;

      const replacements = {
        spu_logo: spuLogo,
        page_banner: pageBanner,

        category: deviceDetails.rows[0].category || "",
        make: deviceDetails.rows[0].make || "",
        model: deviceDetails.rows[0].model || "",
        serial_no: deviceDetails.rows[0].serial_no || "",
        asset_tag: deviceDetails.rows[0].asset_tag || "",

        name: userDetails.rows[0].name || "",
        surname: userDetails.rows[0].surname || "",
        staff_no: userDetails.rows[0].staff_no || "",
        student_number: userDetails.rows[0].student_number || "",
        department_name: userDetails.rows[0].department_name || "",
        faculty_name: userDetails.rows[0].faculty_name || "",
        post_name: userDetails.rows[0].post_name || "",
        course_name: userDetails.rows[0].course_name || "",
        phone_number: userDetails.rows[0].phone_number || "",
        return_date: signatureResponses[0].return_date || "",

        staff_signature: userDetails.rows[0].staff_signature || "",
        student_signature: userDetails.rows[0].student_signature || "",
        returnerfullname: signatureResponses[0].returnerfullname || "",
        returnersignature: signatureResponses[0].returnersignature || "",
      };

      documentTemplate = documentTemplate.replace(/{{(\w+)}}/g, (match, key) => replacements[key] ?? "");

      pdfBuffer = await generatePdf(documentTemplate);

      subject = `Asset Return Form - ${userDetails.rows[0].name} ${userDetails.rows[0].surname}`;
    } else if (formType === "Loan-Issue") {
      //templatePath = path.join(__dirname, "..", "util", "emailTemplates", "sendFormEmailTemplate.html");
      //htmlContent = fs.readFileSync(templatePath, "utf8");

      emailTemplate = emailTemplate
        .replace(/{{recipient_name}}/g, `${userDetails.rows[0].name} ${userDetails.rows[0].surname}`)
        .replace(/{{form_type}}/g, "loaned to you")
        .replace(/{{title}}/g, `Asset Loan Form`);

      /* templatePdf = path.join(__dirname, "..", "util", "pdfTemplates", "Loan-Form-PDF-Template.html");
      pdfContent = fs.readFileSync(templatePdf, "utf8");*/

      const logoPath = path.join(process.cwd(), "public", "SPU_logo.png");
      const bannerImagePath = path.join(process.cwd(), "public", "ict_banner.png");

      if (!logoPath) {
        return res.status(400).json({ message: `SPU Logo not found`, error: true });
      }

      const logoBase64 = fs.readFileSync(logoPath).toString("base64");

      const spuLogo = `data:image/jpeg;base64,${logoBase64}`;

      const bannerPath = path.join(process.cwd(), "public", "page_banner.png");

      const pageBanner = `data:image/png;base64,${fs.readFileSync(bannerPath).toString("base64")}`;

      const replacements = {
        spu_logo: spuLogo,
        page_banner: pageBanner,

        category: deviceDetails.rows[0].category || "",
        make: deviceDetails.rows[0].make || "",
        model: deviceDetails.rows[0].model || "",
        serial_no: deviceDetails.rows[0].serial_no || "",
        asset_tag: deviceDetails.rows[0].asset_tag || "",

        name: userDetails.rows[0].name || "",
        surname: userDetails.rows[0].surname || "",
        staff_no: userDetails.rows[0].staff_no || "",
        student_number: userDetails.rows[0].student_number || "",
        department_name: userDetails.rows[0].department_name || "",
        faculty_name: userDetails.rows[0].faculty_name || "",
        post_name: userDetails.rows[0].post_name || "",
        course_name: userDetails.rows[0].course_name || "",
        phone_number: userDetails.rows[0].phone_number || "",
        issue_date: deviceDetails.rows[0].issue_date || "",

        staff_signature: userDetails.rows[0].staff_signature || "",
        student_signature: userDetails.rows[0].student_signature || "",
        issuerfullname: signatureResponses[0].issuerfullname || "",
        issuersignature: signatureResponses[0].issuersignature || "",
        approverfullname: signatureResponses[0].approverfullname || "",
        approversignature: signatureResponses[0].approversignature || "",
      };

      documentTemplate = documentTemplate.replace(/{{(\w+)}}/g, (match, key) => replacements[key] ?? "");

      pdfBuffer = await generatePdf(documentTemplate);

      subject = `Asset Loan Form - ${userDetails.rows[0].name} ${userDetails.rows[0].surname}`;
    }

    if (!emailTemplate) {
      return console.log({ message: `Email template not found`, error: true });
    }

    const bannerImagePath = path.join(process.cwd(), "public", "ict_banner.png");

    if (!bannerImagePath) {
      return console.log({ message: `ICT Banner not found`, error: true });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailReciever,
      subject: subject,
      html: emailTemplate,
      attachments: [
        {
          filename: "ict_banner.png",
          path: bannerImagePath,
          cid: "ict_banner_image", // Matches the 'src="cid:ict_banner_image"' value in your HTML
        },
        {
          filename: `${userDetails.rows[0].name} ${userDetails.rows[0].surname}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    await sendEmail(mailOptions);

    return res.status(200).json({ message: `Form successfully sent to email.`, error: false });
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
  sendFormViaEmail,
  testEmail,
};
