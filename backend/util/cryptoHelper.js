const crypto = require("crypto");

const ALGORITH = "aes-256-gcm";
const IV_LENGTH = 12;
const KEY_LENGTH = 32;

//Encrypt
const encrypt = (text, key) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITH, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
};

//Decrypt
const decrypt = (encryptedData, key) => {
  const [ivHex, authTagHex, encryptedHex] = encryptedData.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITH, key, iv);
  decipher.setAuthTag(authTag);

  let decrepted = decipher.update(encryptedHex, "hex", "utf8");
  decrepted += decipher.final("utf8");

  return decrepted;
};

module.exports = { encrypt, decrypt };
