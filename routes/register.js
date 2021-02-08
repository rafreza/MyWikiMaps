const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig')
const bcrypt = require('bcrypt')

const app = express();

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
 let { name, email, password } = req.body;
 console.log({ name,
  email,
  password })

//validation steps to insure inputs are valid

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

  // if form validation passed, ACCESS DB ==>

    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //check if email already exists in DB =>

    const queryString = `SELECT * FROM users
    WHERE email = $1`

   pool.query(queryString, [email]).then(results => {

    if(results.rows.length > 0 ) {
      errors.push({ message: "User already exists"});
      res.render("register", { errors });
      } else {

    //if no user in db--> registration process continued

        const queryAddNewUser = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, password`

        pool.query(queryAddNewUser, [name, email, hashedPassword])
        .then( results => {
          console.log(results.rows)
          req.flash('success_msg', "Congradulations, you are now registered. Please log-in")
          res.redirect('/login');

        })
        .catch(err => { console.log('query error:', err)});
      }
   })
    .catch( err => { console.log('query error:', err)});
  }
});

module.exports = router;

