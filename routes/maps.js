const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig');
const app = express();


router.get("/maps", (req, res) => {

  const templateVars = { user_id: req.session['user_id'], email: req.session['email']};
  res.render('create', templateVars);
});

  router.post("/maps", (req, res) => {


    let { title, description, image_url } = req.body;
    console.log({ title,
     description,
     image_url })

    const queryAddNewMap = `
    INSERT INTO maps (title, description, image_url)
    VALUES ($1, $2, $3)
    RETURNING id;`

    pool.query(queryAddNewMap, [title, description, image_url])
    .then( results => {

    //to fecth map Id
    const mapId = results.rows[0].id
    req.session['map_id'] = mapId;

    res.redirect(`/maps/${mapId}`);

    })
       .catch( err => { console.log('query error:', err)});
  });



module.exports = router;


