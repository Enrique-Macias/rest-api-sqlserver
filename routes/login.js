const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../config/db");
const bcrypt = require("bcrypt");

// Obtener todos los usuarios (sin mostrar contraseñas)
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT UserID, FirstName, LastName, Email, CreatedAt FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Ruta de Login
router.post("/", async (req, res) => {
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
      const passwordMatch = await bcrypt.compare(Password, user.PasswordHash);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }
  
      res.json({
        message: "Login exitoso",
        user: { UserID: user.UserID, FirstName: user.FirstName, LastName: user.LastName, Email: user.Email }
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// Registrar un nuevo usuario
router.post("/register", async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10); // Encripta la contraseña

    const pool = await poolPromise;
    await pool
      .request()
      .input("FirstName", sql.VarChar, FirstName)
      .input("LastName", sql.VarChar, LastName)
      .input("Email", sql.VarChar, Email)
      .input("PasswordHash", sql.VarChar, hashedPassword)
      .query("INSERT INTO Users (FirstName, LastName, Email, PasswordHash, CreatedAt) VALUES (@FirstName, @LastName, @Email, @PasswordHash, GETDATE())");

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login (Autenticación de usuario)
router.post("/login", async (req, res) => {
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
    const passwordMatch = await bcrypt.compare(Password, user.PasswordHash);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    res.json({ 
      message: "Login exitoso", 
      user: { UserID: user.UserID, FirstName: user.FirstName, LastName: user.LastName, Email: user.Email }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Actualizar un usuario
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { FirstName, LastName, Email, Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);

    const pool = await poolPromise;
    await pool
      .request()
      .input("UserID", sql.Int, id)
      .input("FirstName", sql.VarChar, FirstName)
      .input("LastName", sql.VarChar, LastName)
      .input("Email", sql.VarChar, Email)
      .input("PasswordHash", sql.VarChar, hashedPassword)
      .query("UPDATE Users SET FirstName = @FirstName, LastName = @LastName, Email = @Email, PasswordHash = @PasswordHash WHERE UserID = @UserID");

    res.json({ message: "Usuario actualizado exitosamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("UserID", sql.Int, id)
      .query("DELETE FROM Users WHERE UserID = @UserID");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
