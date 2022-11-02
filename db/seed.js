// Step 1: Umport pg from the dependency
const { client } = require("./index");

// /Step 2: Create a new pg.Client
const client = new pg.Client('postgres://localhost:5432/insertDBHere'); 

// STEP 3: Export our client variable 
module.exports = {
    client
}