const photoService = require('../../service/photo');

module.exports = async (req, res, next) => {
  const { photoId } = req.params;

  const result = await photoService.getPhoto(photoId);

  if (result.isSuccessful != false)
    return res.send(result.result)

  return res.status(result.status).send({message: result.message})
}