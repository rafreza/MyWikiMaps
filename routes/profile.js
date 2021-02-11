const express = require('express');
const { pool } = require('../dbConfig');
const router  = express.Router();


router.get("/profile/:userId", (req, res) => {
  let map_id = req.session.map_id;
  let user_id= req.session.user_id;

  let userMaps = [];

  console.log("THIS IS THE USER ID YOURE LOOKING FOR GALIT: ", user_id)
  const queryDisplayCreatedMaps = `
  SELECT title
  FROM MAPS
  WHERE user_id =$1;
  `

  pool.query(queryDisplayCreatedMaps, [user_id])
  .then( results => {

  //to fecth map Id

  const mapTitles = results.rows[0].title

  for (let mapId of mapTitles) {
    userMaps.push(res.rows[mapId].title);
  }

  // const mapTitle = results.rows[0].title
  // console.log("THIS IS THE MAP TITLE: ", mapTitle)

  // userMaps.push(mapTitle);

  console.log("THIS IS THE MAP ARRAY GALIT: ", userMaps )
  // req.session['map_id'] = mapId;
  // req.session['map_title'] = mapTitle;

  // res.redirect(`/maps/${mapId}`);

  })
     .catch( err => { console.log('query error:', err)});

  const templateVars = { user_id: req.session['user_id'], email: req.session['email']};
  res.render('profile', templateVars);

});

module.exports = router;
