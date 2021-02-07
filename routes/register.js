const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig')
const bcrypt = require('bcrypt')


router.get("/register", (req, res) => {
  // res.send("REGISTER ROUTE");
  res.render("register");
});

router.post("/register", async (req, res) => {
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
  } else {
    //form validation passed

    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
  }

  pool.query(
    `SELECT * FROM users
    WHERE email = $1`, [email], (err, results) => {
      if (err) {
        throw err
      }
      console.log(results.rows)
    }
  )




});

module.exports = router;
