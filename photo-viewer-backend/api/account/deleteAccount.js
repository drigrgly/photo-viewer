const pool = require('../../db');

module.exports = async (req, res, next) => {
    if (req.params.id == null)
      res.status(404).send({message: "No id supplied"})

    try {
      await pool.query(
        `DELETE FROM "User" WHERE user_id = $1`,
        [req.params.id],
        (error, results) => {
          if (error) {
            console.error(err);
            res.status(500).send('Server error');
          }

          return next();
        }
      );

    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
}