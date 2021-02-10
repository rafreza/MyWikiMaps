const express = require('express');
const router  = express.Router();

router.post('/logout', (req, res) => {
  req.session['user_id'] = null;
  res.redirect('/');
});

module.exports = router;
