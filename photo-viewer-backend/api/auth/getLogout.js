// Logs out the user
module.exports = (req, res, next) => {
  // Invalidate the tokens
  res.cookie('accessToken', '');
  res.cookie('refreshToken', '');
  res.send({success: true});
}