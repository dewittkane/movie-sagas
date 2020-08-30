const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//get route will select all of the genres from the db
//and send back the rows in an array
router.get('/', (req, res) => {
  const getGenresQuery = `SELECT * FROM "genres";`
  pool.query(getGenresQuery)
    .then(result => {
      console.log('Got the genres!');
      res.send(result.rows)
    })
    .catch(error => {
      console.log('error trying to get genres from DB', error);
      res.sendStatus(500);
    })
})

module.exports = router;