const {
  criarDespesa,
  listarDespesasPorUsuario,
} = require("../models/despesasModel");

const registrarDespesa = async (req, res) => {
  try {
    const { titulo, valor, categoria, data } = req.body;

    if (!titulo || !valor) {
      return res.status(400).json({ erro: "Título e valor são obrigatórios." });
    }

    const novaDespesa = await criarDespesa({
      usuario_id: req.usuarioId, // vem do token (middleware)
      titulo,
      valor,
      categoria,
      data,
    });

    res.status(201).json(novaDespesa);
  } catch (err) {
    console.error("Erro ao registrar despesa:", err);
    res.status(500).json({ erro: "Erro ao registrar despesa." });
  }
};

const listarDespesas = async (req, res) => {
  try {
    const despesas = await listarDespesasPorUsuario(req.usuarioId);
    res.json(despesas);
  } catch (err) {
    console.error("Erro ao listar despesas:", err);
    res.status(500).json({ erro: "Erro ao listar despesas." });
  }
};

module.exports = {
  registrarDespesa,
  listarDespesas,
};
