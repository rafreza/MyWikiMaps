const express = require('express');
const { pool } = require('../dbConfig');
const router  = express.Router();




router.get("/profile/:userId", (req, res) => {
  const templateVars = { user_id: req.session['user_id'], email: req.session['email']};
  res.render('profile', templateVars);

});

module.exports = router;
