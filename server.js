import express from "express";
import handlebars from "express-handlebars";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import request from "request";
import cheerio from "cheerio";

const port = process.env.PORT || 3000

mongoose.Promise = Promise;

const app = express();
 
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost/wsj");
const db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function(){
    console.log("Mongoose connection successful.");
});

// Import routes and give the server access to them.
var routes = require("./controller/controller.js");

app.listen(port, function(){
    console.log("App running on port " + port);
});