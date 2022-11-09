const express = require('express');

// Router Imports
const apiRouter = express.Router();
const usersRouter = require('./users');

// Port # 
const PORT = 3000;

const express = require('express');
const server = express();

// Listener
server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

apiRouter.use('/users', usersRouter);


// Export
module.exports = apiRouter;