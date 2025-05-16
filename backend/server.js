require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Rutas iniciales
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Enrique-Macias A01641402");
});

app.get("/marco", (req, res) => {
  res.send("¡Polo!");
});

app.get("/ping", (req, res) => {
  res.json({ message: "Pong!" });
});

// Importar rutas
const itemsRoutes = require("./routes/items");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/login");
const mongoItemsRoutes = require("./routes/mongoItems");

app.use("/items", itemsRoutes);
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/mongo-items", mongoItemsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en ejecución en el puerto ${PORT}`);
});
