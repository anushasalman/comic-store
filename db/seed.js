// Put some initial data in the database
require('dotenv').config();
const { client, createUser, createComic } = require("./index");
const bcrypt = require("bcrypt");


// Create a comics table

// drop any existing tables

const dropTables = async () => {
  try {
    console.log("STARTING TO DROP TABLES...");

    await client.query(`DROP TABLE IF EXISTS comics`);
    await client.query(`DROP TABLE IF EXISTS users`);

    console.log("FINISHED DROPPING TABLES");

  } catch (err) {
    console.log("Error dropping tables");
    throw err;
  }
}

const createTables = async () => {
  try{
    console.log("STARTING TO CREATE TABLES...");

    await client.query(`
    CREATE TABLE comics (
      id SERIAL PRIMARY KEY,
      issueNumber INTEGER NOT NULL,
      title VARCHAR(255) NOT NULL
    );
  
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    `);

    console.log("FINISHED CREATING TABLES");

  } catch(err){
    console.log("Error creating tables");
    throw err;
  }
};

const createUsers = async () => {
  try{
    console.log("Starting to create users...");
    const billy = await createUser("Billy", await bcrypt.hash("BillyBoy", 10));
    const frank = await createUser("Frank", await bcrypt.hash("Frank", 10));
    const suzie = await createUser("Suzie", await bcrypt.hash("suzie", 10));

  }catch(err){
    console.log("Error creating users");
    throw err;
  }
  // console.log("finished creating users");
}

const createComics = async () => {
try {
  console.log("starting to create comics");
  const spiderMan = await createComic({issueNumber: 102, title:"The Amazing Spiderman"});
  const superMan = await createComic({issueNumber: 55, title:"Superman"});
  const xMen = await createComic({issueNumber: 101, title:"The Uncanny X-Men"});

}catch(err){
  console.log("Error creating comics");
  throw err;
}
console.log("finished creating comics");
}

const rebuildDB = async () => {
  try{
    client.connect();

    await dropTables();
    await createTables();
    await createUsers();
    await createComics();

    client.end();
  }catch(err){
    console.log("Error during rebuildDB");
    throw err;
  }
  };

  rebuildDB();