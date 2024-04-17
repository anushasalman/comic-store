const express = require('express');
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("This is the root for /api");
})

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const comicsRouter = require('./comics');
apiRouter.use('/comics', comicsRouter);

module.exports = apiRouter;