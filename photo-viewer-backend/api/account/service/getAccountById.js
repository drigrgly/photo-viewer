const pool = require('../../../db');

module.exports = async (userId) => {
    const result = await pool.query(
      `SELECT account_id, name, email FROM Account Where account_id = $1`,
      [userId]
    );

    // Set the users fo the next middleware
    if (result.rows[0]?.account_id)
      return result.rows[0];

    return null;
}