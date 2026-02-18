// Sends back the users to the client
module.exports = (req, res, next) => {
  const accounts = res.locals.accounts;

  return res.send({users: accounts});
}