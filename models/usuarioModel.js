const db = require("../config/db");

const criarUsuario = async ({ nome, email, senhaCriptografada }) => {
  const query = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING id, nome, email, criado_em;
  `;
  const values = [nome, email, senhaCriptografada];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const buscarUsuarioPorEmail = async (email) => {
  const query = `SELECT * FROM usuarios WHERE email = $1`;
  const { rows } = await db.query(query, [email]);
  return rows[0];
};

module.exports = {
  criarUsuario,
  buscarUsuarioPorEmail,
};
