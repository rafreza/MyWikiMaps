const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig');
const app = express();


router.get("/maps/:mapId", (req, res) => {

  const templateVars = { user_id: req.session['user_id'], email: req.session['email'], map_id: ":mapId" };
  res.render("mapId", templateVars);
  });


  module.exports = router;
