require('dotenv').config({path:'./.env'})

const pool = require('../../db');
const jwt = require('jsonwebtoken');

module.exports = [
    checkLoginCredentials,
    (req, res, next) => {
      let userObject = {
        id: res.locals.id,
        name: res.locals.name
      }

      let token = jwt.sign(userObject, process.env.JWT_TOKEN_SECRET, { expiresIn: "1h" });

      const cookieSettings = {
        httpOnly: true,
        sameSite: "Strict",
      };

      res.cookie('accessToken', token, cookieSettings);

      return res.send({ user: userObject });
    }

]

async function checkLoginCredentials(req, res, next) {
  const {username, password} = req.body;

  try {
    const result = await pool.query(
      `SELECT account_login($1, $2)`,
      [username, password]
    );

    if (result.rows[0]?.account_login) {
      res.locals.name = username;
      res.locals.id = result.rows[0]?.user_login;
      return next();
      
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }

}
