const express = require('express');
const comicsRouter = express.Router();

comicsRouter.get("/", (req, res) => {
  res.send("This is the root for /api/comics");
})

module.exports = comicsRouter;