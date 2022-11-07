// Step 1: Import client from the export index.js
    // You can add all the import FNs here
const { client,
getAllUsers,
 } = require('./index');

// Step 2: User Methods
// Method #1: Test
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


