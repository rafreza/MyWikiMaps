const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig');
const app = express();

router.get("/", (req, res) => {

  let map_id = req.session.map_id;



  const templateVars = { user_id: req.session['user_id'], email: req.session['email']}
  res.render("index", templateVars);
});


module.exports = router;
