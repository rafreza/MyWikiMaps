const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig');
const app = express();


router.get("/maps/:mapId", (req, res) => {

<<<<<<< HEAD
  const templateVars = { user_id: req.session['user_id'], email: req.session['email'], map_id: ":mapId" };
=======
  const templateVars = { user_id: req.session['user_id'], email: req.session['email'], map_id: req.session['map_id'] };
  console.log(templateVars);
>>>>>>> 7fa92b96ae46d4c289914651a27147550adbd797
  res.render("mapId", templateVars);
  });


  module.exports = router;
