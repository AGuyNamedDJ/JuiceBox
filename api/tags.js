const express = require('express');
const usersRouter = express.Router();
const {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
} = require('../db');

// Export
module.exports = tagsRouter;