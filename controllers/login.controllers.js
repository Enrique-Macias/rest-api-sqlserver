// controllers/login.controllers.js
const { sql, poolPromise } = require("../config/db");
const { hashPassword, verifyPassword, generateSalt } = require("../utils/hash");

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT UserID, FirstName, LastName, Email, CreatedAt FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("Email", sql.VarChar, Email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const user = result.recordset[0];
    const passwordMatch = verifyPassword(Password, user.PasswordHash);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    res.json({
      message: "Login exitoso",
      user: {
        UserID: user.UserID,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Registrar usuario
const registerUser = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password } = req.body;

    const salt = generateSalt();
    const hashedPassword = hashPassword(Password, salt);

    const pool = await poolPromise;
    await pool
      .request()
      .input("FirstName", sql.VarChar, FirstName)
      .input("LastName", sql.VarChar, LastName)
      .input("Email", sql.VarChar, Email)
      .input("PasswordHash", sql.VarChar, hashedPassword)
      .query(
        "INSERT INTO Users (FirstName, LastName, Email, PasswordHash, CreatedAt) VALUES (@FirstName, @LastName, @Email, @PasswordHash, GETDATE())"
      );

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getUsers, loginUser, registerUser };
