var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// For serving of static CSS
app.use(express.static(__dirname + "/app/publicfriend"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// API and HTML routes
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
