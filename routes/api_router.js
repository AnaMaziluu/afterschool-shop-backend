let lessons = [
    {
      id: 1,
      subject: "Football Training",
      description: "A fun and energetic after-school football training program for kids aged 7-12.",
      location: "Hendon",
      price: 50.00,
      image: "images/football.png",
      imageFileText: "football",
      availableSpaces: 5,
      rating: 4
    },
    {
      id: 2,
      subject: "Piano Lessons",
      description: "Private piano lessons for beginners and intermediate students, ages 6-15.",
      location: "Hendon",
      price: 30.00,
      image: "images/piano.png",
      imageFileText: "piano",
      availableSpaces: 5,
      rating: 5
    },
    {
      id: 3,
      subject: "Art Workshop",
      description: "Explore creativity in this art workshop with various mediums like painting and clay.",
      location: "London Bridge",
      price: 40.00,
      image: "images/art.png",
      imageFileText: "art",
      availableSpaces: 5,
      rating: 4
    },
    {
      id: 4,
      subject: "Coding for Kids",
      description: "Learn the basics of coding through fun games and activities. Suitable for ages 8-14.",
      location: "Enfield",
      price: 45.00,
      image: "images/coding.png",
      imageFileText: "coding",
      availableSpaces: 5,
      rating: 5
    },
    {
      id: 5,
      subject: "Dance Class",
      description: "A dance class for kids focusing on jazz, ballet, and modern styles.",
      location: "Hendon",
      price: 35.00,
      image: "images/dance.png",
      imageFileText: "dance",
      availableSpaces: 5,
      rating: 3
    },
    {
      id: 6,
      subject: "Math Lessons",
      description: "Private math lessons for beginners.",
      location: "Hendon",
      price: 30.00,
      image: "images/math.png",
      imageFileText: "math",
      availableSpaces: 5,
      rating: 5
    },
    {
      id: 7,
      subject: "Science Explorers",
      description: "Hands-on science experiments and activities that make learning science fun and engaging.",
      location: "Hendon",
      price: 40.00,
      image: "images/science.png",
      imageFileText: "science",
      availableSpaces: 5,
      rating: 4
    },
    {
      id: 8,
      subject: "Chess Club",
      description: "Learn chess strategies and compete with other players. Open to all skill levels.",
      location: "Hendon",
      price: 20.00,
      image: "images/chess.png",
      imageFileText: "chess",
      availableSpaces: 5,
      rating: 4
    },
    {
      id: 9,
      subject: "Drama Class",
      description: "Explore acting techniques, role play, and drama games in a fun and supportive environment.",
      location: "Hendon",
      price: 25.00,
      image: "images/drama.png",
      imageFileText: "drama",
      availableSpaces: 5,
      rating: 5
    },
    {
      id: 10,
      subject: "Baking Basics",
      description: "Learn to bake simple treats and snacks in this introductory baking class.",
      location: "Hendon",
      price: 30.00,
      image: "images/baking.png",
      imageFileText: "baking",
      availableSpaces: 5,
      rating: 4
    }
  ];
  

var express = require("express");
var api = express.Router();

// Router (api):
// - Authorization   ???
// - GET /users
// - POST /user
// - GET /messages
// - POST /message

api.use(function (req, res, next) {
  let msg = "From the router";
  console.log(msg);
  next()
});

api.get("/lessons", function (req, res) {
    console.log("niste lessons")
    res.send(JSON.stringify(lessons));
});

module.exports = api;


// api.get("/users", function (req, res) {
//   /* ... */
// });
// api.post("/user", function (req, res) {
//   /* ... */
// });
// api.get("/messages", function (req, res) {
//   /* ... */
// });
// api.post("/message", function (req, res) {
//   /* ... */
// });


// The fourth is a routing function that responds to “GET /lessons/id” by returning, as a JSON, the lesson with id corresponding to the id parameter received in the request.
// 1. The 5th element is a routing function that responds to “ ” by adding (each time it is called) the following element to your list of lessons (managed with an internal array), returning as a response a JSON ”{id}”, where id is the id of the new element created.
// 2. The 6th element is a routing function that responds to “ ” by updating the element with the id indicated,
// with ) * 2”, and returning as a response a JSON ”{msg: .
// 3. The 7th element is a routing function that responds to “ ” by removing from your list of lessons the element with the id indicated, and returning as a response a JSON ”{msg .
