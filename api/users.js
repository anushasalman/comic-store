const express = require('express');
const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  res.send("This is the root for /api/users");
})

module.exports = usersRouter;