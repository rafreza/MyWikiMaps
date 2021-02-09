const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

router.post('/logout', (req, res) => {
  req.session['user_id'] = null;
  res.redirect('/urls');
});

module.exports = router;
