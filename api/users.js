const express = require('express');
const usersRouter = express.Router();
const {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
} = require('../db');

// Initial usersRouter
usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
 
    next(); // THIS IS DIFFERENT
});

usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();
  
    res.send({
      users
    });
  });
// Export
module.exports = usersRouter;