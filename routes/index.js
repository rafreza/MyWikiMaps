const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig');
const app = express();

router.get("/", (req, res) => {

  let user_id= req.session.user_id;

  const queryDisplayingMaps = `
  SELECT image_url, title, description, id
  FROM maps
  WHERE user_id = $1;
  `

  return pool.query(queryDisplayingMaps, [user_id])
  .then(results => {

  mapInformationResults = results.rows;




  const templateVars = { user_id: req.session['user_id'], email: req.session['email'], mapInfo: mapInformationResults}
  res.render("index", templateVars);
  })
});

router.post("/", (req, res) => {
  const templateVars = { user_id: req.session['user_id'], }
  const queryString = `
  INSERT INTO favorites (user_id, map_id)
  VALUES ($1, $2)
  RETURNING user_id, map_id;`
  return pool.query(queryString, templateVars)
  .then(results => {
    favMaps = results.rows;
    console.log(favMaps);
  })
})



module.exports = router;
