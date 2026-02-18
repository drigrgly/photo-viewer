const pool = require('../../db');
const isEmailOrUsernameInUse = require('../account/service/isEmailOrUsernameInUse');

// Add a new user from the received user data
module.exports = async (req, res, next) => {
  const { email, username, password, pet} = req.body;
  if (email == null || username == null || password == null)
    return res.status(404).send({ message: "Missing fields" })

  // Check if a user already has this email or name
  if (await isEmailOrUsernameInUse(email, username))
    return res.status(400).send({ message: "Name or email already in use"})

  try {
    const result = await pool.query(
      `SELECT account_add($1, $2, $3)`,
      [username, email, password]
    );
    
    return res.sendStatus(200);

  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }

}