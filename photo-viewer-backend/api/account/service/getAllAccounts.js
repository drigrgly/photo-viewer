const pool = require('../../../db');

module.exports = async () => {
  const result = await pool.query(
    `SELECT account_id, name, email FROM Account`
  );

  if (result.rows[0]?.account_id)
    return result.rows;

  return [];
}