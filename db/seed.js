// Step 1: Import pg from the dependency from index.js
const { client } = require("./index");

// Step 2: Create a new pg.Client
const client = new pg.Client('postgres://localhost:5432/juicebox-dev'); 

// STEP 3: Export our client variable 
module.exports = {
    client
}