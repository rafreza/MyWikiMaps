const express = require('express');
const { pool } = require('../dbConfig');
const router  = express.Router();


router.get("/profile/:userId", (req, res) => {

  // TO DISPLAY PROFILES CREATE BY THE USER
  let map_id = req.session.map_id;
  let user_id= req.session.user_id;

  let userMaps = [];

  const queryDisplayCreatedMaps = `
  SELECT id, title
  FROM MAPS
  WHERE user_id =$1;
  `
  return pool.query(queryDisplayCreatedMaps, [user_id])
  .then( results => {
    //DONT NEED FOR NOW BUT MIGHT NEED LATER, simply an aray with the map titles asspciated with the userID
    //userMaps = userMapsQueryResults.map((row) => row.title);

    //VARIABLE THAT HOLDS THE ARRAY WITH OBJECTS NEEDED
    userMapsQueryResults = results.rows
// [ anonymous { id: 1, title: 'Best Little Italy Spots' },
//   anonymous { id: 2, title: 'Best Poutines in Montreal' },
//   anonymous { id: 26, title: 'TEST 4' },
//   anonymous { id: 31, title: 'TEST 2' },
//   anonymous { id: 32, title: 'TEST 4' },
//   anonymous { id: 33, title: 'TEST 15' },
//   anonymous { id: 34, title: 'test 100' },
//   anonymous { id: 35, title: 'test 1000' },
//   anonymous { id: 36, title: 'this is the fun map' },
//   anonymous { id: 37, title: 'My new map' } ]

  const templateVars = { user_id: req.session['user_id'], email: req.session['email'], map_title: userMapsQueryResults };
  res.render('profile', templateVars);;

  })
     .catch( err => { console.log('query error:', err)});

});

module.exports = router;



