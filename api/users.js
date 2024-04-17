const express = require('express');
const bcrypt = require('bcrypt');
const usersRouter = express.Router();
const { client } = require('../db');

usersRouter.get("/", (req, res) => {
  res.send("This is the root for /api/users");
})
// Log in a user
usersRouter.post('/login', async (req, res) => {
  const username = req.body.username;
  const plainTextPassword = req.body.password;

// Does this user exist
// Get first position in that array, username in this case
try {
const { rows: [user] } = await client.query(
  `
SELECT * FROM users
WHERE username = $1
`, 
[username] 
);
// console.log(user);
// if there is no user, send back error
if(!user){
  res.sendStatus(401);
}
else{
  // Check password against hash
const passwordIsAMatch = await bcrypt.compare(plainTextPassword, user.password);
if(passwordIsAMatch){
// This is a valid login
res.send("This is a valid login");

}else{
  res.sendStatus(401);
}
}
} catch(err) {
  console.log(err);
res.sendStatus(500);
}
  //res.send("/login")
});




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
try {
  // I need to create user with username and hashed password
const {
  rows: [ user ],
} = await client.query(
  `
INSERT INTO users(username, password)
VALUES ($1, $2)
RETURNING *;
`, 
[username, hashedPassword]
);

// console.log(user);
res.send({ id: user.id });
} catch (err) {
  console.log("Error creating user", err);
  res.sendStatus(500);
}
});


module.exports = usersRouter;