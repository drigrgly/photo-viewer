require('dotenv').config({path:'./.env'})

const bcrypt = require('bcrypt');

const pool = require('../../db');
const jwt = require('jsonwebtoken');

module.exports = [
    checkLoginCredentials,
    (req, res, next) => {
      let userObject = {
        id: res.locals.id,
        username: res.locals.username,
        isAuthenticated: true,
        role: res.locals.role
      }

      let token = jwt.sign(userObject, process.env.JWT_TOKEN_SECRET, { expiresIn: "1h" });
      let refreshToken = jwt.sign(userObject, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "1h" });

      const cookieSettings = {
        httpOnly: true,
        sameSite: "Strict",
      };

      res.cookie('accessToken', token, cookieSettings);
      res.cookie('refreshToken', refreshToken, cookieSettings);

      return res.send({ user: userObject });
    }
]

async function checkLoginCredentials(req, res, next) {
  const {username, password} = req.body;

  if (username == null || password == null)
    return res.status(404).send({ message: "Missing fields" })

  try {
    const [result] = await pool.query(
      `SELECT u.id, u.username, u.password, r.name AS role FROM users u INNER JOIN roles r ON role_id = r.id WHERE u.username = ?`,
      [username]
    );

    if (result.length == 0)
      return res.status(404).send("User not found");

    let doPasswordsMatch = await bcrypt.compare(password, result[0].password);
    

    if (doPasswordsMatch) {
      res.locals.username = username;
      res.locals.id = result[0].id;
      res.locals.role = result[0].role;

      return next();
      
    } else {
      return res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }

}
