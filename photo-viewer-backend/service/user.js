const pool = require('../db');

exports.isUsernameInUse = async (username) => {
    const [result] = await pool.query(
      `SELECT username FROM users WHERE username = ?`,
      [username]
    );

    return result.length != 0;
}

exports.createUser = async (payload) => {
  try {
    // Array destructing, shorthand for returned[0]
    const [roleResult] = await pool.query(`SELECT id FROM roles WHERE name="USER"`)

    let userRoleId;
    if (roleResult[0]?.id)
      userRoleId = roleResult[0]?.id;
    else {
      return false;
    }

    const data = {
      username: payload.username,
      password: payload.password,
      role_id: userRoleId
    };

    console.log("Here will be the problem");

    const result = await pool.query(`INSERT INTO users SET ?`, data);

    return result.affectedRows != 0;
  } catch (err) {
    console.log(err);
    return false;
  }
}