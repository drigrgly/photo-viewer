// Checks if the given token is valid
module.exports = (req, res, next) => {
  if (res.locals.isAuthenticated)
    return res.send({ valid: true, user: res.locals.user });
  else
    return res.send({ valid: false });
}