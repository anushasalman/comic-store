// Put some initial data in the database

const {client} = require('./index');

// Create a comics table

// drop any existing tables

const dropTables = async () => {
  try{
    console.log("STARTING TO DROP TABLES...");

    await client.query(`DROP TABLE IF EXISTS comics`);

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
      title VARCHAR (25) NOT NULL
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