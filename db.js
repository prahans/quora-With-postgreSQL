// db.js
require("dotenv").config(); // <-- must be at the top, before using process.env

const { Pool } = require("pg");

const quora = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = quora;
