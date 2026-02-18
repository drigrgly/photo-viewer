const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

pool.connect()
  .then(() => console.log(`PostgreSQL running on port ${process.env.DB_PORT}`))
  .catch(err => console.error(`PostgreSQL connection failed: ${err}`));

module.exports = pool;