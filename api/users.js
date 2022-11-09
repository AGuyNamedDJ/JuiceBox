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
  
    res.send({ message: 'hello from /users!' });
  });
  

  // Export
  module.exports = usersRouter;