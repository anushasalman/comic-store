const express = require('express');
const bcrypt = require('bcrypt');
const usersRouter = express.Router();
const {client} = require('../db');

usersRouter.get("/", (req, res) => {
  res.send("This is the root for /api/users");
})

// Create a user with a hashed password
usersRouter.post("/register", async (req, res) => {

  // They give username and password on the body
  const username = req.body.username;
  const plainTextPassword = req.body.password;
  //console.log("USERNAME", username);
  //console.log("PLAIN TEXT PASSWORD", plainTextPassword);

  // I need to hash password 
  // saltRounds is how much power put into hashing it
  // Higher number = the more secure the password, longer to hash it
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
  //console.log("HASHED PASSWORD:", hashedPassword);

  // I need to create user with username and hashed password

res.send("Called /register");

})



module.exports = usersRouter;