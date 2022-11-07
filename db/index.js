// Basics
    // The DB Index.js declares our FNs our app will use
    // Then exports those FNs

// Step 1: Import pg from the dependency from index.js
const { Client } = require('pg');

// Step 2: Create a new pg.Client
const client = new Client('postgres://localhost:5432/juicebox-dev'); 

// Step 3: Helper Functions

    // FN: createUser
async function createUser({ username, password }) {
  try {
    const result = await client.query(`

    `);

    return result
  } catch (error) {
    throw error;
  }
}
    

    // FN: getAllUsers
async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username 
      FROM users;
    `);
  
    return rows;
  }



// Step Final: Export our client variable & other FNs
module.exports = {
    client,
    createUser,
    getAllUsers,
}