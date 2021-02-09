const express = require('express');
const { pool } = require('../dbConfig');
const router  = express.Router();

router.get("/profile", (req, res) => {
  const templateVars = { user_id: req.session['user_id'], email: req.session['email']}
  res.render("profile", templateVars);

  const getMaps = function(limit) {

    let queryString = `
        SELECT * FROM maps
        `;

    return pool.query(queryString, queryParams).then(res => res.rows);
  };

  getAllMaps()
  .then(maps => {
    res.send({ maps }).catch(err => {
      res.status(500).json({ error: err.message });
    });
  })
  .catch(e => {
    console.error(e);
    res.send(e);
  });

});

module.exports = router;
