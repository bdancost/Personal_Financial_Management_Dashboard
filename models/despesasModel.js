const db = require("../config/db");

// Criar uma nova despesa para um usuário
const criarDespesa = async ({ usuario_id, titulo, valor, categoria, data }) => {
  const query = `
    INSERT INTO despesas (usuario_id, titulo, valor, categoria, data)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [usuario_id, titulo, valor, categoria, data];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Listar todas as despesas de um usuário
const listarDespesasPorUsuario = async (usuario_id) => {
  const query = `
    SELECT * FROM despesas
    WHERE usuario_id = $1
    ORDER BY data DESC;
  `;

  const { rows } = await db.query(query, [usuario_id]);
  return rows;
};

module.exports = {
  criarDespesa,
  listarDespesasPorUsuario,
};
