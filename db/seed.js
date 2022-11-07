// Basics
    // The DB Seed.js
        // Imports our FNs
        // Build/Rebuild tables
        // Fill tables w/ starting Data
    // Check tables for
        // Correct Definitions
        // No nwanted Data
        // Data for us to Manipulate
        // User-facing Data

// Code

// Step 1: Import client from the export index.js
    // You can add all the import FNs here
const { client,
getAllUsers,
 } = require('./index');


// Step 2: User Methods

 // Method: createTables
async function createTables() {
    try {
    console.log("Starting to build tables...");

      await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );
      `);

      console.log("Finished building tables!");
    } catch (error) {
        console.error("Error building tables!");
        throw error; // we pass the error up to the function that calls createTables
    }
  }

    // Method: dropTables
async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
    DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error; // we pass the error up to the function that calls dropTables
  }
}

    // Method: testTables
async function testDB() {
    try {
      // Step 2a: Connect the client to the database
      client.connect();
  
      // Step 2b: Queries are promises, so we can await them
      const users = await getAllUsers();
  
      // Step 2c: Logging is a fine way to see what's up
      console.log(users);
    } catch (error) {
      console.error(error);
    } finally {
      // Step 2d: Close out the client connection
      client.end();
    }
  }
  testDB();

  // Method: rebuildDB
  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
    } catch (error) {
      throw error;
    }
  }

    // ethod: testDB
  async function testDB() {
    try {
      console.log("Starting to test database...");
  
      const users = await getAllUsers();
      console.log("getAllUsers:", users);
  
      console.log("Finished database tests!");
    } catch (error) {
      console.error("Error testing database!");
      throw error;
    }
  }
  
  rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());