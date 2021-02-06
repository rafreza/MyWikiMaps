const express = require('express');
const router  = express.Router();

router.get("/logout", (req, res) => {
  res.send("LOGOUT ROUTE");

});

module.exports = router;
