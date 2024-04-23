const express = require("express");
const comicsRouter = express.Router();
const { getAllComics, createComic } = require("../db");
const { requireUser } = require("./utils");

comicsRouter.get("/", async (req, res) => {
  // get all comics
try{
const comics = await getAllComics();

res.send(comics);
} 
catch (err){
  res.sendStatus(500);
}
})


comicsRouter.post("/", requireUser, async (req, res) => {
  // console.log(req.user);
if(!req.user){
  // 401 error: unauthorized
  res.sendStatus(401);
}
else {
  try{
  // get info from body
const {title, issueNumber} = req.body;
  //insert into comics in db
const newlyCreatedComic = await createComic({issueNumber, title})

  //send back success message
  res.send(newlyCreatedComic);
  }
  catch(err){
res.sendStatus(500);
  }
}
});




module.exports = comicsRouter;