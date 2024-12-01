const cors = require("cors");
var express = require("express");
var path = require("path");
var fs = require("fs");
var morgan = require("morgan");
let propertiesReader = require("properties-reader");

const app = express();
app.set("json spaces", 3);

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://AnaMazilu:hellokitty10@webstorecluster.es90c.mongodb.net/?retryWrites=true&w=majority&appName=WebstoreCluster";
let db;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    // Confirm successful connection
    await client.db("admin").command({ ping: 1 });
    db = client.db("Webstore");
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the application if unable to connect
  }
}

// Connect to the database before starting the server
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






// // ---------------// ---------------// ---------------// ---------------// ---------------// ---------------// ---------------// ---------------// ---------------


// const cors = require("cors");
// var express = require("express");
// var path = require("path");
// var fs = require("fs");
// var morgan = require("morgan");
// let propertiesReader = require("properties-reader");
// // var apiRouter = require("./routes/api_router.js");

// const app = express();
// app.set("json spaces", 3);


// let propertiesPath = path.resolve(__dirname, "conf/db.properties");
// let properties = propertiesReader(propertiesPath);
// let dbPrefix = properties.get("db.prefix");
// let dbUsername = encodeURIComponent(properties.get("db.user"));
// let dbPwd = encodeURIComponent(properties.get("db.pwd"));
// let dbName = properties.get("db.dbName");
// let dbUrl = properties.get("db.dbUrl");
// let dbParams = properties.get("db.params");
// // const uri = dbPrefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;
// // const uri = "mongodb+srv://AnaMazilu:hellokitty10@webstorecluster.es90c.mongodb.net/?retryWrites=true&w=majority&appName=WebstoreCluster";
// // Connecting to MongoDB
// // const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// // const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
// // let db = client.db(dbName);
 

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://AnaMazilu:hellokitty10@webstorecluster.es90c.mongodb.net/?retryWrites=true&w=majority&appName=WebstoreCluster";
// let db

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     db = client.db("Webstore")
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// app.get("/favicon.ico", (req, res) => res.status(204));
// app.use(cors());

// app.use(express.json());
// // The logging middleware
// app.use(morgan("short"));

// // Static file middleware
// // var imagesPath = path.resolve(__dirname, "images")
// //  ?? Aici fac fetch pentru imagini? din front-end?
// var imagesPath = path.join(__dirname, "images");
// app.use(express.static(imagesPath));

// // API router
// // app.use("/collections", apiRouter);
// // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// app.param("collectionName", function (req, res, next, collectionName) {
//   console.log(`Collection '${collectionName}' is being accessed.`);
  
//   req.collection = db.collection(collectionName);
//   return next();
// });

// app.get("/", function (req, res, next) {
//   res.send("Select a collection");
// });

// app.get("/collections/:collectionName", function (req, res, next) {
//   console.log("OLLLLLA")
//   console.log("Collection object:", req.collection);

//   req.collection.find({}).toArray(function (err, results) {
//     if (err) {
//       console.log("1")
//       return next(err);
//     }
//     console.log("2")
//     res.send(results);
//   });
// });

// // Error middleware
// app.use(function (req, res) {
//   res.status(404);
//   res.send("File not found");
// });

// app.listen(3000, function () {
//   console.log("App started on port 3000");
// });











// ---------------// ---------------// ---------------// ---------------// ---------------// ---------------// ---------------// ---------------// ---------------// ---------------// ---------------







// const cors = require("cors");
// const express = require("express");
// const path = require("path");
// const morgan = require("morgan");
// const propertiesReader = require("properties-reader");
// const { MongoClient, ServerApiVersion } = require("mongodb");

// const app = express();
// app.set("json spaces", 3);
// app.use(cors());
// app.use(express.json());

// // Load properties from db.properties
// const propertiesPath = path.resolve(__dirname, "conf/db.properties");
// const properties = propertiesReader(propertiesPath);
// const dbPrefix = properties.get("db.prefix");
// const dbUser = encodeURIComponent(properties.get("db.user"));
// const dbPwd = encodeURIComponent(properties.get("db.pwd"));
// const dbUrl = properties.get("db.dbUrl");
// const dbName = properties.get("db.dbName");
// const dbParams = properties.get("db.params");
// const uri = dbPrefix + dbUser + ":" + dbPwd + dbUrl + dbParams;

// // MongoDB connection
// const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
// let db; // To store the database instance

// client
//   .connect()
//   .then(() => {
//     db = client.db(dbName);
//     console.log("DB AQUI  " + db)
//     console.log("collections QUIII" + db.listCollections().toArray);
//     console.log("Connected to MongoDB successfully!");

//     // List all collections in the database
//     db.listCollections().toArray((err, collections) => {
//       if (err) {
//         console.error("Error listing collections:", err);
//       } else {
//         console.log(
//           "Available collections:",
//           collections.map((c) => c.name)
//         );
//       }
//     });

//     // Start the server only after connecting to MongoDB
//     app.listen(3000, "0.0.0.0", () => {
//       console.log("App started on port 3000 and accessible on 0.0.0.0");
//     });
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB:", err);
//     process.exit(1); // Exit the application on connection failure
//   });

// // Middleware
// app.use(morgan("short"));

// // Middleware for collection
// app.param("collectionName", function (req, res, next, collectionName) {
//   console.log(`Collection '${collectionName}' is being accessed.`);
//   try {
//     req.collection = db.collection(collectionName);
//     next();
//   } catch (err) {
//     console.error(`Failed to access collection '${collectionName}':`, err);
//     res.status(500).send("Invalid collection.");
//   }
// });

// // Route
// app.get("/", function (req, res) {
//   res.send("Select a collection");
// });

// app.get("/collections/:collectionName", function (req, res, next) {
//   console.log("Accessing collection");
//   req.collection.find({}).toArray(function (err, results) {
//     if (err) {
//       console.error("Error querying collection:", err);
//       return next(err);
//     }
//     console.log("Query results:", results);
//     res.send(results);
//   });
// });

// app.param("collectionName", function (req, res, next, collectionName) {
//   console.log(`Collection '${collectionName}' is being accessed.`);
//   req.collection = db.collection(collectionName);
//   return next();
// });

// app.get("/collections/:collectionName", function (req, res, next) {
//   console.log("Accessing collection:", req.params.collectionName);
//   req.collection.find({}).toArray((err, results) => {
//     if (err) {
//       console.error("Error querying collection:", err);
//       return next(err);
//     }
//     console.log("Query results:", results);
//     res.send(results);
//   });
// });

// // Error handling
// app.use((req, res) => {
//   res.status(404).send("File not found");
// });
