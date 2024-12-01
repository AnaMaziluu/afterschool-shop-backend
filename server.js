const cors = require("cors");
var express = require("express");
var path = require("path");
var fs = require("fs");
var morgan = require("morgan");
let propertiesReader = require("properties-reader");

const app = express();
app.set("json spaces", 3);

const { MongoClient, ServerApiVersion } = require('mongodb');

// Load properties from db.properties
const propertiesPath = path.resolve(__dirname, "conf/db.properties");
const properties = propertiesReader(propertiesPath);
const dbPrefix = properties.get("db.prefix");
const dbUser = encodeURIComponent(properties.get("db.user"));
const dbPwd = encodeURIComponent(properties.get("db.pwd"));
const dbUrl = properties.get("db.dbUrl");
const dbName = properties.get("db.dbName");
const dbParams = properties.get("db.params");
const uri = dbPrefix + dbUser + ":" + dbPwd + dbUrl + dbParams;

let db;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    db = client.db("Webstore");
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

// Connect to the database
connectToDatabase();

// Middleware and route definitions
app.get("/favicon.ico", (req, res) => res.status(204));
app.use(cors());
app.use(express.json());
app.use(morgan("short"));

// Static file middleware
var imagesPath = path.join(__dirname, "images");
app.use(express.static(imagesPath));

// API router
app.param("collectionName", function (req, res, next, collectionName) {
  console.log(`Collection '${collectionName}' is being accessed.`);
  req.collection = db.collection(collectionName);
  return next();
});

app.get("/", function (req, res, next) {
  res.send("Select a collection");
});

app.get("/collections/:collectionName", async function (req, res, next) {
  try {
    const results = await req.collection.find({}).toArray();
    res.send(results);
  } catch (err) {
    next(err);
  }
});

// Error middleware
app.use(function (req, res) {
  res.status(404);
  res.send("File not found");
});

// Start the server
const server = app.listen(3000, "0.0.0.0", function () {
  console.log("App started on port 3000 and is listening on all network interfaces.");
});