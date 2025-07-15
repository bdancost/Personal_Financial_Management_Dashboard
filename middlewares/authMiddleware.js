const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "segredo_super_seguro";

const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuarioId = decoded.id; // ⬅️ Você poderá usar isso nas próximas rotas
    next();
  } catch (err) {
    return res.status(403).json({ erro: "Token inválido ou expirado." });
  }
};

module.exports = autenticar;
