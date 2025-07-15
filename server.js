// server.js
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const db = require("./config/db");

// Middlewares
app.use(cors());
app.use(express.json());

// Teste de rota
app.get("/", (req, res) => {
  res.send("API funcionando ✅");
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
