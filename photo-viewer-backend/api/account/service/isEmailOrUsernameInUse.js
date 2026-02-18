const pool = require('../../../db');

module.exports = async (email, name) => {
    const result = await pool.query(
      `SELECT account_id, name, email FROM Account Where email = $1 OR name = $2`,
      [email, name]
    );

    // Set the users fo the next middleware
    if (result.rows[0]?.account_id)
      return true;

    return false;
}