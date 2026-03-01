const photoService = require('../../service/photo');

module.exports = async (req, res, next) => {
  console.log("Getting the photos");
  const result = await photoService.getAllPhotos();

  return res.send(result)
}