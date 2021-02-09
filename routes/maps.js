const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig');


router.get("/maps", (req, res) => {

  const templateVars = { user_id: req.session['user_id'], email: req.session['email']};
  res.render('create', templateVars);
  const getMaps = () => {
    let queryString = `
    SELECT * FROM maps
    `;
    return pool.query(queryString).then(res => res.rows[0]);
  };

  getMaps()
    .then(maps => {
      res.send({ maps }).catch(err => {
        res.status(500).json({ error: err.message });
      });
    })
    .catch(e => {
      res.send(e);

    });
  });




module.exports = router;


