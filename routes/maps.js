const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig');
const app = express();


router.get("/maps", (req, res) => {
  const templateVars = { user_id: req.session['user_id'], email: req.session['email']};
  res.render('create', templateVars);
});

  router.post("/maps", (req, res) => {

    let user_id = req.session.user_id;
    let { title, description, image_url } = req.body;

    const queryAddNewMap = `
    INSERT INTO maps (user_id, title, description, image_url)
    VALUES ($1, $2, $3, $4)
    RETURNING id, title;`

    pool.query(queryAddNewMap, [user_id, title, description, image_url])
    .then( results => {

    //to fecth map Id
    const mapId = results.rows[0].id
    const mapTitle = results.rows[0].title

    req.session['map_id'] = mapId;
    req.session['map_title'] = mapTitle;

    res.redirect(`/maps/${mapId}`);

    })
       .catch( err => { console.log('query error:', err)});
  });



module.exports = router;


