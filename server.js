// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const despesasRoutes = require("./routes/despesasRoutes"); // ⬅️ nova rota

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/despesas", despesasRoutes); // ⬅️ rota protegida

app.get("/", (req, res) => {
  res.send("API funcionando ✅");
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
