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
const {
    client,
    createUser,
    getAllUsers
  } = require('./index');

// Step 2: User Methods
  
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
      throw error;
    }
  }
  
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
      throw error;
    }
  }
  
    // Method: testTables
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

  // Method: createInitialUsers
  async function createInitialUsers() {
    try {
        const albertTwo = await createUser({ username: 'albert', password: 'imposter_albert' });
        
      console.log("Starting to create users...");
  
      const albert = await createUser({ username: 'albert', password: 'bertie99' });
  
      console.log(albert);
  
      console.log("Finished creating users!");
    } catch(error) {
      console.error("Error creating users!");
      throw error;
    }
  }
  
  // Final Method: rebuildDB
  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
    } catch (error) {
      throw error;
    }
  }
  
  rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());