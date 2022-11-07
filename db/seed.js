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

// Step 1: Import client from the export index.js
    // You can add all the import FNs here
const { client,
getAllUsers,
 } = require('./index');


// Step 2: User Methods

 // Method: createTables
async function createTables() {
    try {
      await client.query(`
  
      `);
    } catch (error) {
      throw error; // we pass the error up to the function that calls createTables
    }
  }

    // Method: dropTables
async function dropTables() {
  try {
    await client.query(`

    `);
  } catch (error) {
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

  // Last Method: rebuildDB
  async function rebuildDB() {
	try {
		client.connect();
        await createTables();
		await dropTables();
	} catch (error) {
		console.error(error);
    } finally {
        client.end();
      }
    }
    rebuildDB();