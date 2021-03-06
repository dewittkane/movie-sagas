const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

//get route will select all of the movies from the db
//and send back the rows in an array
router.get('/', (req, res) => {
  const getMoviesQuery = `SELECT * FROM "movies";`
  pool.query(getMoviesQuery)
    .then(result => {
      console.log('Got the movies!');
      res.send(result.rows)
    })
    .catch(error => {
      console.log('error trying to get movies from DB', error);
      res.sendStatus(500);
    })
})

//sends a get request for one moving by sending id param in the router
router.get('/:id', (req, res) => {
  const getDetailsQuery = `SELECT movies.*, genres.name FROM movies
  JOIN movies_genres ON movies.id = movies_genres.movies_id
  JOIN genres ON genres.id = movies_genres.genres_id
  WHERE movies.id = $1;`

  pool.query(getDetailsQuery, [req.params.id])
    .then(result => {
      console.log('Got the details!!');
      res.send(result.rows)
    })
    .catch(error => {
      console.log('error trying to get movies from DB', error);
      res.sendStatus(500);
    })
});


router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.posterUrl, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Depending on how you make your junction table, this insert COULD change.
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movies_id", "genres_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;