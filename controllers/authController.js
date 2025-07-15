const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  criarUsuario,
  buscarUsuarioPorEmail,
} = require("../models/usuarioModel");

const JWT_SECRET = process.env.JWT_SECRET || "segredo_super_seguro";

const registrar = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { nome, email, senha } = req.body;

    const existe = await buscarUsuarioPorEmail(email);
    if (existe) {
      return res.status(400).json({ erro: "E-mail já cadastrado." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = await criarUsuario({ nome, email, senhaCriptografada });

    res.status(201).json(novoUsuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao registrar usuário." });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await buscarUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Credenciais inválidas." });
    }

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: "2h" });

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao fazer login." });
  }
};

module.exports = {
  registrar,
  login,
};
