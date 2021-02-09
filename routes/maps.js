const express = require('express');
const router  = express.Router();


<<<<<<< HEAD

});
=======
router.get("/maps", (req, res) => {
  const templateVars = { user_id: req.session['user_id'], email: req.session['email']}
  res.render("create", templateVars);
})
>>>>>>> master

module.exports = router;


