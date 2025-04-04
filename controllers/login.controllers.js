// controllers/login.controllers.js
const { sql, poolPromise } = require("../config/db");
const { hashPassword, verifyPassword, generateSalt } = require("../utils/hash");
const jwt = require('jsonwebtoken');

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
    console.log('Login attempt for email:', Email);
    
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Email", sql.VarChar, Email)
      .query("SELECT * FROM Users WHERE Email = @Email");

    console.log('Database query result:', result.recordset.length > 0 ? 'User found' : 'User not found');

    if (result.recordset.length === 0) {
      console.log('No user found with email:', Email);
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const user = result.recordset[0];
    console.log('User found, verifying password...');
    console.log('Stored password hash:', user.PasswordHash);
    
    const passwordMatch = verifyPassword(Password, user.PasswordHash);
    console.log('Password match result:', passwordMatch);

    if (!passwordMatch) {
      console.log('Password verification failed');
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    console.log('Password verified, generating token...');
    // Generate JWT token
    const token = jwt.sign(
      {
        UserID: user.UserID,
        Email: user.Email,
        FirstName: user.FirstName,
        LastName: user.LastName
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful, sending response');
    res.json({
      message: "Login exitoso",
      token,
      user: {
        UserID: user.UserID,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
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

// Check and display existing users
const checkUsers = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT Email, PasswordHash FROM Users");
    console.log('Existing users:', result.recordset);
  } catch (err) {
    console.error("Error checking users:", err);
  }
};

// Call the function when the module loads
checkUsers();

// Reset and create test user
const resetAndCreateTestUser = async () => {
  try {
    const pool = await poolPromise;
    
    // First, delete any existing test user
    await pool.request()
      .input("Email", sql.VarChar, "test@test.com")
      .query("DELETE FROM Users WHERE Email = @Email");
    console.log("Any existing test user deleted");

    // Create new test user
    const testEmail = "test@test.com";
    const testPassword = "contra123";
    const salt = generateSalt();
    const hashedPassword = hashPassword(testPassword, salt);

    console.log('Creating new test user with:');
    console.log('Email:', testEmail);
    console.log('Password:', testPassword);
    console.log('Salt:', salt);
    console.log('Hashed Password:', hashedPassword);

    await pool
      .request()
      .input("FirstName", sql.VarChar, "Test")
      .input("LastName", sql.VarChar, "User")
      .input("Email", sql.VarChar, testEmail)
      .input("PasswordHash", sql.VarChar, hashedPassword)
      .query(
        "INSERT INTO Users (FirstName, LastName, Email, PasswordHash, CreatedAt) VALUES (@FirstName, @LastName, @Email, @PasswordHash, GETDATE())"
      );
    
    console.log("Test user created successfully");

    // Verify the user was created
    const verifyResult = await pool.request()
      .input("Email", sql.VarChar, testEmail)
      .query("SELECT * FROM Users WHERE Email = @Email");
    
    console.log("Verification - User exists:", verifyResult.recordset.length > 0);
    if (verifyResult.recordset.length > 0) {
      console.log("User details:", verifyResult.recordset[0]);
    }
  } catch (err) {
    console.error("Error in resetAndCreateTestUser:", err);
  }
};

// Call the function when the module loads
resetAndCreateTestUser();

module.exports = { getUsers, loginUser, registerUser };
