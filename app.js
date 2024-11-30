const cors = require("cors");
var express = require("express");
var path = require("path");
var fs = require("fs");
var morgan = require("morgan");
var apiRouter = require("./routes/api_router.js");

var app = express();
app.set("json spaces", 3);

// Database
let propertiesReader = require("properties-reader");
let propertiesPath = path.resolve(__dirname, "conf/db.properties");
let properties = propertiesReader(propertiesPath);
let dbPprefix = properties.get("db.prefix");
let dbUsername = encodeURIComponent(properties.get("db.user"));
let dbPwd = encodeURIComponent(properties.get("db.pwd"));
let dbName = properties.get("db.dbName");
let dbUrl = properties.get("db.dbUrl");
let dbParams = properties.get("db.params");
const uri = dbPprefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;




app.get("favicon.ico", (req, res) => res.status(204));
app.use(cors());
// The logging middleware
app.use(morgan("short"));

app.use(express.json());

app.param("collectionName", function (req, res, next, collectionName) {
  req.collectionName = db.collectionName(collectionName);
  return next();
});

// Static file middleware
// var imagesPath = path.resolve(__dirname, "images")
var imagesPath = path.join(__dirname, "images");
app.use(express.static(imagesPath));

// API router
app.use("/collections", apiRouter);

// Error middleware
app.use(function (req, res) {
  res.status(404);
  res.send("File not found");
});

app.listen(3000, function () {
  console.log("App started on port 3000");
});
