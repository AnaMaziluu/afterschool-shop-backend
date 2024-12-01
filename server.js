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

app.post("/collections/orders", async (req, res) => {
  try {
    const order = req.body;
    if (!order.name || !order.surname || !order.phoneNumber || !order.lessonIDs) {
      return res.status(400).send("Missing required fields");
    }

    const result = await db.collection("orders").insertOne(order);
    res.status(201).send({ message: "Order created successfully", orderId: result.insertedId });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send("Internal server error");
  }
});

app.put("/collections/lessons/:id", async (req, res) => {
  try {
    const lessonId = parseInt(req.params.id);
    const updatedFields = req.body;

    const result = await db.collection("lessons").updateOne(
      { id: lessonId },
      { $set: updatedFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("Lesson not found");
    }

    res.send({ message: "Lesson updated successfully" });
  } catch (error) {
    console.error("Error updating lesson:", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.q || "";

    // Check if the searchTerm is numeric
    const isNumeric = !isNaN(searchTerm);

    const query = isNumeric
      ? {
          $or: [
            { subject: { $regex: searchTerm, $options: "i" } },
            { location: { $regex: searchTerm, $options: "i" } },
            { price: parseFloat(searchTerm) },
            { availableSpaces: parseInt(searchTerm) },
          ],
        }
      : {
          $or: [
            { subject: { $regex: searchTerm, $options: "i" } },
            { location: { $regex: searchTerm, $options: "i" } },
          ],
        };

    const results = await db.collection("lessons").find(query).toArray();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error performing search:", error);
    res.status(500).send("Internal server error");
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