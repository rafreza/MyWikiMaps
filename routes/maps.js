const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig');


router.get("/maps", (req, res) => {

  const templateVars = { user_id: req.session['user_id'], email: req.session['email']};
  res.render('create', templateVars);
});






module.exports = router;


