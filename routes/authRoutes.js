const express = require("express");
const router = express.Router();
const { registrar, login } = require("../controllers/authController");
const autenticar = require("../middlewares/authMiddleware");

router.post("/register", registrar);
router.post("/login", login);

// ⛔ Rota protegida ⛔
router.get("/perfil", autenticar, (req, res) => {
  res.json({
    mensagem: "Acesso autorizado!",
    usuarioLogado: req.usuarioId,
  });
});

module.exports = router;
