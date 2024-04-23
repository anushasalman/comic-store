const express = require('express');
const jwt = require('jsonwebtoken');
const {getUserById} = require('../db');
const apiRouter = express.Router();

//middleware so we use next to move on to next
apiRouter.use( async (req, res, next) => {
  // Check the header if there is a token there
  const prefix = "Bearer ";
  const auth = req.header('Authorization');
  // if there is no token, move on
  if (!auth) {
    next();
  }
  else if (auth.startsWith(prefix)){

const token = auth.slice(prefix.length);

    // if there is a token, look up the user
const {id} = jwt.verify(token, process.env.JWT_SECRET);

if(id){
// set the "user" on request to be the user
const user = await getUserById(id);
req.user = {id: user.id, username: user.username};
next();
} else{
  next();
}

  }
  else {
    next();
  }
})


apiRouter.get("/", (req, res) => {
  res.send("This is the root for /api");
})

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const comicsRouter = require('./comics');
apiRouter.use('/comics', comicsRouter);

module.exports = apiRouter;