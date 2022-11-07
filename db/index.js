// Step 1: Import pg from the dependency from index.js
const { Client } = require('pg');

// Step 2: Create a new pg.Client
const client = new Client('postgres://localhost:5432/juicebox-dev'); 

// User Methods

// Method #1: Test
async function testDB() {
    try {
      // Connect the client to the database
      client.connect();
  
      // Queries are promises, so we can await them
      const result = await client.query(`SELECT * FROM users;`);
  
      // Logging is a fine way to see what's up
      console.log(result);
    } catch (error) {
      console.error(error);
    } finally {
      // Close out the client connection
      client.end();
    }
  }
  
  testDB();



// Step Final: Export our client variable 
module.exports = {
    client
}