// config/db.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no banco de dados", err);
  } else {
    console.log("🎯 Banco de dados conectado com sucesso");
  }
});

module.exports = pool;
