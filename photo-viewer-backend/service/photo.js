const pool = require('../db');
const crypto = require('crypto');

exports.uploadPhoto = async (payload) => {
  try {
    const result = await pool.query(`INSERT INTO photos (name, path, user_id) VALUES (?, ?, ?)`,
      [payload.name, payload.path, payload.userId]
    );

    return result.affectedRows != 0;

  } catch (err) {
    console.log(err);
    return false;
  }

}

exports.getPhoto = async (photoId) => {
  console.log(photoId);
  try {
    const [result] = await pool.query(
      `SELECT p.id, p.name, p.upload_date as uploadDate, p.path, p.user_id as userId, u.username
       FROM photos p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?`,
       [photoId]
    );

    if (result.length == 0)
      return {isSuccessful: false, status: 404, message: "Photo doesn't exist"};
    return {isSuccessful: true, result: result[0]};

  } catch (err) {
    console.log(err);
    return {isSuccessful: false, status: 500,  message: "Error during operation"};
  }
}

exports.getAllPhotos = async () => {
  try {
    const [result] = await pool.query(
      `SELECT p.id, p.name, p.upload_date as uploadDate, p.path, p.user_id as userId, u.username FROM photos p INNER JOIN users u ON p.user_id = u.id`
    );

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

exports.deletePhoto = async (photoId) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM photos WHERE id = ?`,
      [photoId]
    );

    if (result.affectedRows == 0)
      return {isSuccessful: false, status: 500,  message: "Error during operation"};

    return {isSuccessful: true}

  } catch (err) {
    console.log(err);
    return {isSuccessful: false, status: 500,  message: "Error during operation"};
  }


}
