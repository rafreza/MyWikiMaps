const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig');
const app = express();


router.get("/maps/:mapId", (req, res) => {

  const templateVars = { user_id: req.session['user_id'], email: req.session['email'], map_id: req.session['map_id'], map_title: req.session['map_title'] };
  console.log(templateVars);
  res.render("mapId", templateVars);
  });

router.post("/maps/:mapId", (req, res) => {
  console.log(req.body);
  res.status(200).send();

  });


  module.exports = router;
