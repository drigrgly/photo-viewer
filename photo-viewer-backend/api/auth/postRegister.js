const user = require('../user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Add a new user from the received user data
module.exports = async (req, res, next) => {
  const { username, password, confirmPassword } = req.body;
  if (username == null || password == null || confirmPassword == null)
    return res.status(404).send({ message: "Missing fields" })

  // TODO: password requirements

  if (password != confirmPassword)
    return res.status(400).send({ message: "Passwords don't match"})

  if (await user.isUsernameInUse(username))
    return res.status(400).send({ message: "Name or email already in use"})

  let successfulAdd = false;
   
  let hashedPassword = await bcrypt.hash(password, saltRounds);

  payload = {
    username: username,
    password: hashedPassword,
  }

  successfulAdd = await user.createUser(payload);

  if (successfulAdd)
    res.sendStatus(200);
  else
    return res.status(500).send('Server error');
}