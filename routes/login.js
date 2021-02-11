const express = require('express');
const router  = express.Router();
const { pool } = require('../dbConfig')
const bcrypt = require('bcrypt')
const app = express();

router.get("/login", (req, res) => {
  const templateVars = { user_id: undefined , email: undefined }
  res.render("login", templateVars);
});

router.post("/login", (req, res) => {

  let { email, password } = req.body;
  // console.log({email, password})

  // ACCESSING DB TO VERIFY THAT EMAIL EXISTS =>

    const queryString = `SELECT * FROM users
    WHERE email = $1;`

   pool.query(queryString, [email])

    .then(results => {

    //IF USER EXISTS IN DB =>
      if(results.rows.length > 0 ) {

        let hashedPassword = results.rows[0].password;

        // verify that password is correct
        if(bcrypt.compareSync(password, hashedPassword)) {
          console.log("we're in")

            /// Adding into session object ---user_id = key --> and results.rows[0].id = value
          const userId = results.rows[0].id;
          req.session['email'] = results.rows[0].email;

          req.session['user_id'] = userId;
          res.redirect(`/profile/:${userId}`);

        } else {
          //if password not correct
          req.flash('failure_msg',"Password incorrect, please try again.")
          res.redirect('/login')
        }
     // IF USER DOES NOT EXIST IN DB =>
      } else {
          req.flash('failureEmail_msg',"Email not found, please register.")
          res.redirect('/login');
        }
    })
    .catch( err => {
      console.log('query error:', err)
    });
  }
 );

module.exports = router;
