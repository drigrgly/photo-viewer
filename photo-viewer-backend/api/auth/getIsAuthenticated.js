const { checkUserAuth } = require("../common/tokenHelper")

// Add a new user from the received user data
module.exports = async (req, res, next) => {
  let user = res.locals.user;

  if (user === null || user === undefined)
    return res.status(401).send({message: 'Authentication is invalid'});

  return res.status(200).send(user)
}
