const getAllUsers = require('./service/getAllAccounts');

module.exports = async (req, res, next) => {
    try {
      res.locals.users = await getAllUsers();
    } catch (err) {
      console.error(err);
      return res.status(500).send('Server error');
    }

  return next();
}