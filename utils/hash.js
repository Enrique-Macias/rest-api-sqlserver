const crypto = require("crypto");
const PEPPER = process.env.PEPPER || "default_pepper";

function generateSalt(length = 16) {
  return crypto.randomBytes(length).toString("base64url");
}

function hashPassword(password, salt) {
  const msg = salt + PEPPER + password;
  const hash = crypto.createHash("sha512").update(msg).digest("base64url");
  return `${salt}:${hash}`;
}

function verifyPassword(inputPassword, storedHash) {
  const [salt, originalHash] = storedHash.split(":");
  const inputHash = hashPassword(inputPassword, salt).split(":")[1];
  return inputHash === originalHash;
}

module.exports = { hashPassword, verifyPassword, generateSalt };
