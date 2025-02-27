const sql = require("mssql");

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT),
    options: {
      encrypt: false, // No usar en conexiones sin SSL
      trustServerCertificate: true, // Para aceptar certificados autofirmados
    },
  };
  
  const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
      console.log("✅ Conectado a SQL Server");
      return pool;
    })
    .catch(err => {
      console.error("❌ Error al conectar con SQL Server:", err);
    });
  
  module.exports = { sql, poolPromise };
  
