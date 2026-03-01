const photoService = require('../../service/photo');

module.exports = async (req, res, next) => {
  const { photoId } = req.params;

  // The requireAuth supplies us the userId of the requester
  const requesterId = res.locals.user.id;

  // Check if the owner of the photo is the user
  let photoResult = await photoService.getPhoto(photoId);

  if (!photoResult.isSuccessful)
    return res.status(result.status).send({message: result.message})

  if (photoResult.result.userId != requesterId)
    return res.status(401).send({message: "Unauthorized to delete the photo"})

  const result = await photoService.deletePhoto(photoId);

  if (result.isSuccessful != false)
    return res.send();

  return res.status(result.status).send({message: result.message})
}