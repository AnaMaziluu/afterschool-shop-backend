// const http = require("http")
// const lodash = require("lodash")

// let {randomInteger, MAX} = require("./tests")

// let lessons =
// [
//     { 'topic': 'math', 'location': 'London', 'price': 100 },
//     { 'topic': 'math', 'location': 'Liverpool', 'price': 80 },
//     { 'topic': 'math', 'location': 'Oxford', 'price': 90 },
//     { 'topic': 'math', 'location': 'Bristol', 'price': 120 },
// ]

// function requestHandler(req, res) {
//     let response
//     if (req.url == "/location") {
//         response = lodash.find(lessons, {location: "Oxford"})

//     } else if (req.url == "/findunder100") {
//         response = lodash.find(lessons, (lesson) => lesson.price < 100)
//     } else if (req.url == "/findLast") {
//         response = lodash.findLast(lessons, (lessons) => lessons.price < 100)
//     } else if ( req.url == "/shuffle") {
//         response = lodash.shuffle(lessons)
//     } else {
//         response = "OOOO macarena aiai"
//     }

//     return res.end(response)
// }

// let myServer = http.createServer(requestHandler)
// myServer.listen(3000, () => {
//     console.log("Server is running on http://localhost:3000");
//     console.log(randomInteger)
//     console.log(MAX)
// });

const cors = require("cors")
var express = require("express");
var path = require("path")
var fs = require("fs")
var morgan = require("morgan")


var app = express();
app.set('json spaces', 3);

app.get('favicon.ico', (req, res) => res.status(204))
app.use(cors())
// The logging middleware
app.use(morgan("short"))

// The authorization middleware
// app.use(function (req, res, next) {
//   let minute = new Date().getMinutes();
//   if (minute % 2 === 0) {
//     next();
//   } else {
//     res.statusCode = 403;
//     res.end("Not authorized");
//   }

//   return;
// });

// Static file middleware
// var imagesPath = path.resolve(__dirname, "images")
//  ?? Aici fac fetch pentru imagini? din front-end?
var imagesPath = path.join(__dirname, "images")
app.use(express.static(imagesPath))



// API 




// Error middleware
app.use(function (req, res) {
  res.status(404);
  res.send("File not found");
});






app.listen(3000, function () {
  console.log("App started on port 3000");
});
