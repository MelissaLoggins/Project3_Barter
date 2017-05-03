
// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var passport = require('passport');
var mongoose = require('mongoose');


require('./config/passport')(passport);


// Initialize Express
var app = express();

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Set up a static folder (public) for our web app
app.use(express.static("public"));

//MongoDB Config
mongoose.connect("localhost:27017/barter");
var db = mongoose.connection;

// Database configuration
// Save the URL of our database as well as the name of our collection
var databaseUrl = "barter";
var collections = ["traders"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});


// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res) {
  res.send("Hello world");
});

// 2. At the "/all" path, display every entry in the barter collection
app.get("/all", function(req, res) {
  // Query: In our database, go to the barter collection, then "find" everything
  db.traders.find({}, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// 3. At the "/name" path, display every entry in the barter collection, sorted by name
app.get("/name", function(req, res) {
  // Query: In our database, go to the barter collection, then "find" everything,
  // but this time, sort it by name (1 means ascending order)
  db.traders.find().sort({ name: 1 }, function(error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// No weight path. 
// 4. At the "/weight" path, display every entry in the barter collection, sorted by weight
// app.get("/weight", function(req, res) {
//   // Query: In our database, go to the animals collection, then "find" everything,
//   // but this time, sort it by weight (-1 means descending order)
//   db.traders.find().sort({ weight: -1 }, function(error, found) {
//     // Log any errors if the server encounters one
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });
// });

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});