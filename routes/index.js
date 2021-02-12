const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig');
const app = express();

router.get("/", (req, res) => {

  let id= req.session.map_id;

  const queryDisplayingMaps = `
  SELECT image_url, title, description, id
  FROM maps;
  `

  return pool.query(queryDisplayingMaps)
  .then(results => {


  mapInformationResults = results.rows;


  const templateVars = { user_id: req.session['user_id'], email: req.session['email'], mapInfo: mapInformationResults, map_id: req.session['map_id']}
  res.render("index", templateVars);
  })
  .catch( err => { console.log('query error:', err)});
});

router.post("/", (req, res) => {

    let IDs = req.body;

    const queryString = `
    INSERT INTO favorites (user_id, map_id)
    VALUES ($1, $2)
    RETURNING user_id, map_id;`


    return pool.query(queryString, [IDs.userId, IDs.mapId])
    .then(results => {
      res.redirect('/');
    })


})



module.exports = router;
