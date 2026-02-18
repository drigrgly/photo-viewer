const getUserByID = require('./service/getAccountById');
// Get user
// Params from url: id
module.exports = async (req, res, next) => {
  if (req.params.id == null)
    res.status(400).send({ message: "No id supplied" })

  // Get the user from the db
  try {
    const user = getUserByID(req.params.id);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }

  if (user == null)
    return res.status(404).send({message: "User doesn't exist"})

  res.locals.user = user;

  return next();
}