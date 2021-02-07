const express = require('express');
const router  = express.Router();

router.get("/register", (req, res) => {
  // res.send("REGISTER ROUTE");
  res.render("register");
});

router.post("/register", (req, res) => {
  const id = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;

  if (id === "" || email === "") {
    res.status(400);
    res.send("Empty field: status 400");
  }
  if (getUserByEmail(email, users)) {
    res.status(404);
    res.send("Email already exists: status 404");

  } else {
    const salt = bcrypt.genSaltSync(saltRounds);
    const newUser = {id, email, password: bcrypt.hashSync(password, salt)};
    users[id] = newUser;
    req.session['user_id'] = id;
    res.redirect("/urls");
  }
});

module.exports = router;
