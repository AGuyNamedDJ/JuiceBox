// Basics
    // The DB Index.js declares our FNs our app will use
    // Then exports those FNs

// Step 1: Import pg from the dependency from index.js
const { Client } = require('pg');

// Step 2: Create a new pg.Client
const client = new Client('postgres://localhost:5432/juicebox-dev'); 

// Step 3: Helper Functions

    // FN: createUser
    async function createUser({ 
      username, 
      password,
      name,
      location
    }) {
      try {
        const { rows: [ user ] } = await client.query(`
          INSERT INTO users(username, password, name, location) 
          VALUES($1, $2, $3, $4) 
          ON CONFLICT (username) DO NOTHING 
          RETURNING *;
        `, [username, password, name, location]);
    
        return user;
      } catch (error) {
        throw error;
      }
    }
    

    // FN: getAllUsers
async function getAllUsers() {
    const { rows } = await client.query(
      `SELECT id, username, name, location, active 
      FROM users;
    `);
  
    return rows;
  }

  // FN: updateUser
  async function updateUser(id, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
  
    // return early if this is called without fields
    if (setString.length === 0) {
      return;
    }
  
    try {
      const { rows: [ user ] } = await client.query(`
        UPDATE users
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
      `, Object.values(fields));
  
      return user;
    } catch (error) {
      throw error;
    }
  }


// Step Final: Export our client variable & other FNs
module.exports = {
    client,
    createUser,
    getAllUsers,
    updateUser,
}
