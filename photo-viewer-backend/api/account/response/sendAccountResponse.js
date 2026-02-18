// Sends back the user to the client
module.exports = (req, res, next) => {
  const account = res.locals.account;

  if (account == null || account == undefined)
    return res.status(404).send({message: "Account not found"});

  return res.send({user: account});
}