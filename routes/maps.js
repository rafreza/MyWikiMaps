const express = require('express');
const router  = express.Router();

router.get("/maps", (req, res) => {
  res.send("MAPS ROUTE");

});

module.exports = router;


