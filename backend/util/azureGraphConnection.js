const msal = require("@azure/msal-node");
const fs = require("fs");
const path = require("path");
require("isomorphic-fetch");
const { Client } = require("@microsoft/microsoft-graph-client");
require("dotenv").config();

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    clientSecret: process.env.CLIENT_SECRET,
  },
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

async function getToken() {
  console.log(process.env.CLIENT_ID);

  const results = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });

  return results.accessToken;
}

const sendEmail = async (mailOptions) => {
  try {
    const token = await getToken();

    const client = Client.init({
      authProvider: (done) => done(null, token),
    });

    //Prepare the base payload
    const graphMailPayload = {
      message: {
        subject: mailOptions.subject,
        body: {
          contentType: "Html",
          content: mailOptions.html, // Receives the html string from controller
        },
        toRecipients: mailOptions.to.map((email) => ({
          emailAddress: { address: email },
        })),
        attachments: [], // Will hold attachments if provided
      },
      saveToSentItems: "true",
    };

    // 3. Process attachments natively for Graph API if present
    if (mailOptions.attachments && mailOptions.attachments.length > 0) {
      for (const attach of mailOptions.attachments) {
        if (fs.existsSync(attach.path)) {
          const fileBuffer = fs.readFileSync(attach.path);
          graphMailPayload.message.attachments.push({
            "@odata.type": "#microsoft.graph.fileAttachment",
            name: attach.filename,
            contentType: "image/png", // Adjust mapping dynamically if sending other files
            contentBytes: fileBuffer.toString("base64"),
            isInline: true,
            contentId: attach.cid, // Matches <img src="cid:ict_banner_image" /> inside approvalEmail.html
          });
        }
      }
    }

    await client.api("/users/ictasset.manager@spu.ac.za/sendMail").post(graphMailPayload);

    /* await client.api("/users/kgosiyagae.motabogi@spu.ac.za/sendMail").post({
    message: {
      subject: mailOptions.subject,
      body: {
        contentType: "HTML",
        content: "<h2>Hello From Node.js</h2>",
      },
      toRecipients: [
        {
          emailAddress: {
            address: "ndosisetlole@gmail.com",
          },
        },
      ],
    },
  });*/

    console.log("Email sent");

    return true;
  } catch (error) {
    console.error("Graph API Error details:", error.response?.data || error);
    throw error;
  }
};

module.exports = { sendEmail };
