const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig')
const bcrypt = require('bcrypt')

const app = express();




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


  pool.query(
    `SELECT * FROM users
    WHERE email = $1`, [email], (err, results) => {
      if (err) {
        throw err
      }
      console.log(results.rows);

      if(results.rows.length > 0 ) {
        errors.push({ message: "User already exists"});
        res.render("register", { errors });
      } else {
        //no user in db--> registration process continued
        pool.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, password`, [name, email, hashedPassword], (err, results) => {
          if(err) {
            throw err
          }
          console.log(results.rows)
          req.flash('success_msg', "Congradulations! You are now registered.")
          res.redirect('/login');
        })



      }
    }
  )
  }



});

module.exports = router;
