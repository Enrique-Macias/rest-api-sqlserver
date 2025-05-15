const crypto = require("crypto");
const PEPPER = process.env.PEPPER || "m1ySuP3rS3cr3tP3pp3r";

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

function hashPassword(password, salt) {
  console.log('Hashing password with salt:', salt);
  const msg = salt + PEPPER + password;
  console.log('Message to hash:', msg);
  const hash = crypto.createHash("sha512").update(msg).digest("base64url");
  const result = `${salt}:${hash}`;
  console.log('Generated hash:', result);
  return result;
}

function verifyPassword(inputPassword, storedHash) {
  console.log('Verifying password...');
  console.log('Stored hash:', storedHash);
  const [salt, originalHash] = storedHash.split(":");
  console.log('Extracted salt:', salt);
  
  // Recreate the exact same hash process
  const msg = salt + PEPPER + inputPassword;
  console.log('Message to hash:', msg);
  const inputHash = crypto.createHash("sha512").update(msg).digest("base64url");
  console.log('Input hash:', inputHash);
  console.log('Original hash:', originalHash);
  const match = inputHash === originalHash;
  console.log('Hash match:', match);
  return match;
}

module.exports = { hashPassword, verifyPassword, generateSalt };
