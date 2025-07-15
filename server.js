// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
