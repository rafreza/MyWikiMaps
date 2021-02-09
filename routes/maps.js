const express = require('express');
const router  = express.Router();

router.get("/maps", (req, res) => {
  res.render("create");


});

module.exports = router;


