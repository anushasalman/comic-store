require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const { client } = require("./db");
const apiRouter = require('./api');

const app = express();
const PORT = 8080;

// console.log(process.env.DATABASE_URL);

// connecting to database
client.connect();

app.use(morgan('dev'));

// Parses body if it is url encoded
app.use(bodyParser.urlencoded({ extended: false }))
// Parse body if it is in json form
app.use(bodyParser.json())

app.use((req, res, next) => {
  // log out everything on body of request to make sure it's working
  console.log("<___BODY LOGGER START___>");
  console.log(req.body);
  console.log("<___BODY LOGGER END___>");
  next();
});

// Everything that comes in with /api use the api router which is in index.js file
app.use('/api', apiRouter);


app.get("/", (req, res) => {
  res.send(`<h1>Comic Store</h1>`);
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("and Anusha's favorite food is " + process.env.FOOD);
});