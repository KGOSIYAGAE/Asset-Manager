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

    const graphMailPayload = {
      message: {
        subject: mailOptions.subject,

        body: {
          contentType: "HTML",
          content: mailOptions.html,
        },

        toRecipients: mailOptions.to.map((email) => ({
          emailAddress: {
            address: email,
          },
        })),

        attachments: [],
      },

      saveToSentItems: true,
    };

    // Process attachments
    if (mailOptions.attachments?.length > 0) {
      for (const attach of mailOptions.attachments) {
        let fileBuffer;

        // -----------------------------------------
        // Attachment supplied as a Buffer
        // -----------------------------------------
        if (attach.content) {
          fileBuffer = Buffer.isBuffer(attach.content) ? attach.content : Buffer.from(attach.content);
        }

        // -----------------------------------------
        // Attachment supplied as a file path
        // -----------------------------------------
        else if (attach.path) {
          if (!fs.existsSync(attach.path)) {
            console.error(`Attachment not found: ${attach.path}`);
            continue;
          }

          fileBuffer = fs.readFileSync(attach.path);
        }

        // -----------------------------------------
        // Skip invalid attachment
        // -----------------------------------------
        else {
          console.error(`No content or path for attachment: ${attach.filename}`);
          continue;
        }

        const contentType = attach.contentType || "application/octet-stream";

        const isInline = !!attach.cid;

        graphMailPayload.message.attachments.push({
          "@odata.type": "#microsoft.graph.fileAttachment",

          name: attach.filename,

          contentType: contentType,

          contentBytes: fileBuffer.toString("base64"),

          isInline: isInline,

          ...(attach.cid && {
            contentId: attach.cid,
          }),
        });

        console.log("Attachment added:", {
          filename: attach.filename,
          contentType: contentType,
          size: fileBuffer.length,
          isInline: isInline,
        });
      }
    }

    console.log("Total attachments:", graphMailPayload.message.attachments.length);

    await client.api("/users/ictasset.manager@spu.ac.za/sendMail").post(graphMailPayload);

    console.log("Email Sent!!");

    return true;
  } catch (error) {
    console.error("Graph API Error details:", error.response?.data || error);

    throw error;
  }
};

module.exports = { sendEmail };
