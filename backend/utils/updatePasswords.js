// scripts/updatePasswords.js
const { sql, poolPromise } = require("../config/db");
const { hashPassword, generateSalt } = require("../utils/hash");


const CONTRASEÑA_DEFAULT = "Temporal123"; 

const updateAllPasswords = async () => {
  try {
    const pool = await poolPromise;

    // 1. Obtener todos los usuarios
    const result = await pool.request().query("SELECT UserID FROM Users");
    const users = result.recordset;

    console.log(`Actualizando ${users.length} contraseñas...`);

    for (const user of users) {
      const salt = generateSalt();
      const hashedPassword = hashPassword(CONTRASEÑA_DEFAULT, salt);

      await pool
        .request()
        .input("PasswordHash", sql.VarChar, hashedPassword)
        .input("UserID", sql.Int, user.UserID)
        .query("UPDATE Users SET PasswordHash = @PasswordHash WHERE UserID = @UserID");

      console.log(`✅ Usuario ID ${user.UserID} actualizado`);
    }

    console.log("🎉 Todos los usuarios fueron actualizados con el nuevo esquema de contraseña.");
  } catch (err) {
    console.error("❌ Error actualizando contraseñas:", err);
  }
};

updateAllPasswords();
