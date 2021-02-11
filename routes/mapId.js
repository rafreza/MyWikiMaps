const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig');
const app = express();


router.get("/maps/:mapId", (req, res) => {
  const templateVars = { user_id: req.session['user_id'], email: req.session['email'], map_id: req.session['map_id'], map_title: req.session['map_title'] };
  const queryGetMarkerData =
  `SELECT * FROM points
  WHERE map_id = $1;
  `
  console.log("params: ", req.params);
  pool.query(queryGetMarkerData, [Number(req.params["mapId"])])
  .then( results => {

    console.log(results.rows);
    templateVars.markers = results.rows;
    console.log(templateVars);
    res.render("mapId", templateVars);
  });


  });

router.post("/maps/:mapId", (req, res) => {

  let { title, description, address, image_url, map_id, lat, lng } = req.body;

  const queryAddNewPoints = `
  INSERT INTO points (map_id, title, description, image_url, address, latitude, longitude)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING id, title;`

  pool.query(queryAddNewPoints, [ Number(map_id), title, description, image_url, address, Number(lat), Number(lng)])
  .then( results => {

    const pointerId = results.rows[0].id
    const pointerTitle = results.rows[0].title

    req.session['pointer_id'] = pointerId;
    req.session['pointer_title'] = pointerTitle;

  // res.redirect(`/maps/${mapId}`);

  })
     .catch( err => { console.log('query error:', err)});
  });


  module.exports = router;
