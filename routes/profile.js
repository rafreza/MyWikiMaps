const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req,res) => {
    const templateVars = {
      loggedInUser: req.session.userId,
      userName: req.session.userName,
      user: 0,
    };
    res.render("users", templateVars);
  });

  router.get("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    if (Number.isInteger(id)) {
      db.query(`
      SELECT * FROM users
      WHERE users.id = $1
      `, [id])
        .then(data => {
          if (data.rows[0]) {
            const templateVars = {
              loggedInUser: req.session.userId,
              userName: req.session.userName,
              user: data.rows[0]
            };

            res.render("users", templateVars);

          } else {
            res.redirect('/error404');
          }
        })
        .catch(err => console.log(err));
    } else {
      res.redirect('/error404');
    }
  });

  router.get("/:id/maps", (req, res) => {
    const myMaps = db.query(`
    SELECT maps.id, maps.title
    FROM maps
    WHERE owner_id = $1
    ORDER BY maps.date_created;
    `, [req.params.id]);

    const myFaves = db.query(`
    SELECT DISTINCT maps.id, maps.title
    FROM maps
    JOIN favorites ON maps.id = map_id
    WHERE favorites.user_id = $1;
    `, [req.params.id]);

    const myContributions = db.query(`
    SELECT DISTINCT maps.id, maps.title
    FROM maps
    JOIN points on maps.id = map_id
    WHERE points.user_id = $1;
    `, [req.params.id]);

    Promise.all([myMaps, myFaves, myContributions])
      .then(data => {
        const userMaps = {
          myMaps: data[0].rows,
          myFaves: data[1].rows,
          myContributions: data[2].rows
        };
        res.json(userMaps);
      })
      .catch(err => console.log(err));

  });

  return router;
};
