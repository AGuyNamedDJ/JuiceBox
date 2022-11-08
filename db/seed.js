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
    getAllUsers,
    updateUser,
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
          password varchar(255) NOT NULL,
          name varchar(255) NOT NULL,
          location varchar(255) NOT NULL,
          active boolean DEFAULT true
        );
      `);
  
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }
  
    // Method: testDB
  async function testDB() {
    try {
      console.log("Starting to test database...");
  
      console.log("Calling getAllUsers")
      const users = await getAllUsers();
      console.log("getAllUsers:", users);
  
      console.log("Calling updateUser on users[0]")
      const updateUserResult = await updateUser(users[0].id, {
        name: "Newname Sogood",
        location: "Lesterville, KY"
      });
      console.log("Result:", updateUserResult);
  

      console.log("Finished database tests!");
    } catch (error) {
      console.error("Error testing database!");
      throw error;
    }
  }

  // Method: createInitialUsers
  async function createInitialUsers() {
    try {
      console.log("Starting to create users...");
  
      await createUser({ 
        username: 'albert', 
        password: 'bertie99',
        name: 'Big AL',
        location: 'Chicago, IL' 
      });
      await createUser({ 
        username: 'sandra', 
        password: '2sandy4me',
        name: 'Lil Ole Sandra',
        location: 'Miami, FL'
      });
      await createUser({ 
        username: 'glamgal',
        password: 'soglam',
        name: 'Erica The Great',
        location: 'Frisco, Tx'
      });
  
      console.log("Finished creating users!");
    } catch (error) {
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