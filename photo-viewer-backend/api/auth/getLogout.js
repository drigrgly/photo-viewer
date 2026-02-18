// Logs out the user
module.exports = (req, res, next) => {
  // Delete the token
  res.cookie('accessToken', '');
  res.send({success: true});
}