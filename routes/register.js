const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig')


router.get("/register", (req, res) => {
  // res.send("REGISTER ROUTE");
  res.render("register");
});

router.post("/register", (req, res) => {
 let { name, email, password } = req.body;
 console.log({ name,
  email,
  password })


  let errors = [];

  if(!name || !email || !password) {
    errors.push({ message: "Please enter all fields!" })
  };

  if(password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters!"})
  }

  if(errors.length > 0) {
    res.render("register", { errors });
  }
});

module.exports = router;
