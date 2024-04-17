require('dotenv').config()
const express = require('express');
const { client } = require('./db');

 const app = express();
 const PORT = 8080;

// console.log(process.env.DATABASE_URL);


 client.connect();

app.get("/", (req, res) => {

  res.send(`<h1>Comic Store</h1>`);
});


 app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("and Anusha's favorite food is " + process.env.FOOD);
 });