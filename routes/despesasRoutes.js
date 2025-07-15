const express = require("express");
const router = express.Router();
const {
  registrarDespesa,
  listarDespesas,
} = require("../controllers/despesaController");
const autenticar = require("../middlewares/authMiddleware");

// Criar nova despesa (POST)
router.post("/", autenticar, registrarDespesa);

// Listar todas as despesas do usuário (GET)
router.get("/", autenticar, listarDespesas);

module.exports = router;
