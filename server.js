// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const saltRounds = 10;
// const session = require('express-session');
const flash = require('express-flash');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['topsecret'],
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(flash());

app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");


// 1. REQUIRING OUR FUNCTIONS
const mapsRoutes = require("./routes/maps");
const mapIdRoutes = require("./routes/mapId");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");
const profileRoutes = require("./routes/profile");
const logoutRoutes = require("./routes/logout");



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));


//2. APP.USE FOR OUR FUNCTIONS

app.use(mapsRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(profileRoutes);
app.use(logoutRoutes);
app.use(mapIdRoutes);

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const templateVars = { user_id: req.session['user_id'], email: req.session['email']}
  res.render("index", templateVars);
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
