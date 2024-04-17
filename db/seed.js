// Put some initial data in the database
require('dotenv').config()
const {client} = require('./index');

// Create a comics table

// drop any existing tables

const dropTables = async () => {
  try{
    console.log("STARTING TO DROP TABLES...");

    await client.query(`DROP TABLE IF EXISTS comics`);
    await client.query(`DROP TABLE IF EXISTS users`);

    console.log("FINISHED DROPPING TABLES");

  } catch(err){
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
      title VARCHAR (255) NOT NULL
    );
  
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR (255) NOT NULL
    );
  
    `);

    console.log("FINISHED CREATING TABLES");

  } catch(err){
    console.log("Error creating tables");
    throw err;
  }
}


const rebuildDB = async () => {
  try{
    client.connect();

    await dropTables();
    await createTables();

    client.end();
  }catch(err){
    console.log("Error during rebuildDB");
    throw err;
  }
  };

  rebuildDB();