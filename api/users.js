const express = require('express');
const bcrypt = require('bcrypt');
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { client, createUser } = require('../db');

const signToken = (username, id) => {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1w",
  });
  return token;
};

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
    if (!user) {
      res.sendStatus(401);
    }
    else {
      // Check password against hash
      const passwordIsAMatch = await bcrypt.compare(plainTextPassword, user.password);
      if (passwordIsAMatch) {
        // This is a valid login
        // Todo: Send a JWT to the client
        const token = signToken(user.username, user.id);
        // Call a function that makes token


        res.send({ message: "Successfully logged in", token });

      } else {
        res.sendStatus(401);
      }
    }
  } catch (err) {
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

    const user = createUser(username, hashedPassword);

    // console.log(user);
    // todo: send back the JWT Token
    //Sign a token with user info
    const token = signToken(user.username, user.id);

    // console.log(token);


    // Send back the token
    res.send({ message: "Successful Registration", token });
  } catch (err) {
    console.log("Error creating user", err);
    res.sendStatus(500);
  }
});


module.exports = usersRouter;