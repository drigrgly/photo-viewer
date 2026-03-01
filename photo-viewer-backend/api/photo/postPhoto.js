const photoService = require('../../service/photo');

module.exports = async (req, res, next) => {
  // The requireAuth fills out the user information
  const userId = res.locals.user.id;
  const name = req.body.name;

  const file = req.file;

  const path = file.path;

  photoPayload = {
    userId: userId,
    name: name,
    path: path
  };

  const isSuccessful = photoService.uploadPhoto(photoPayload);

  if (isSuccessful)
    return res.send({message: "Successful upload"})

  return res.status(500).send({message: "Error during upload"})

}