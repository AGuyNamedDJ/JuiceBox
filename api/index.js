const express = require('express');

// Router Imports
const apiRouter = express.Router();
const postsRouter = require('./posts')
const usersRouter = require('./users');
const tagsRouter = require('./tags');

const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;


// JWT Middleware
// set `req.user` if possible; Middleware read JWT
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) { // nothing to see here
        // IF: The Authorization header wasn't set. This might happen with registration or login, or when the browser doesn't have a saved token. Regardless of why, there is no way we can set a user if their data isn't passed to us.
      next();
    } else if (auth.startsWith(prefix)) {
        // ELSE IF: It was set, and begins with Bearer followed by a space. If so, we'll read the token and try to decrypt it. a. On successful verify, try to read the user from the database b. A failed verify throws an error, which we catch in the catch block. We read the name and message on the error and pass it to next()
      const token = auth.slice(prefix.length);
  
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
  
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
        // ELSE: A user set the header, but it wasn't formed correctly. We send a name and message to next()
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });

// User Set
apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});
  
// Routers
apiRouter.use('/users', usersRouter);
apiRouter.use('/posts', postsRouter);
apiRouter.use('/tags', tagsRouter)
apiRouter.use((error, req, res, next) => {
    res.send({
      name: error.name,
      message: error.message
    });
  });


// Export
module.exports = apiRouter;