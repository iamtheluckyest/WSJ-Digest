var express = require( "express");
var handlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


var port = process.env.PORT || 3000

mongoose.Promise = Promise;

var app = express();

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/wsj");
var db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function(){
    console.log("Mongoose connection successful.");
});

// var routes and give the server access to them.
require("./controller/controller.js")(app);
require("./controller/scraper.js")(app);

app.listen(port, function(){
    console.log("App running on port " + port);
});