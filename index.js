require('dotenv').config();

// Port # 
const PORT = 3000;

const express = require('express');
const morgan = require('morgan');
const server = express();
const { client } = require("./db");
const apiRouter = require("./api");
  // Import router
client.connect();
  // Connecting to Client

//Server.use
server.use(morgan("dev"));
  // Logs out incoming request
server.use(express.json());
  // Read incoming JSON from request

// Listener
server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});

// Server.use
server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });

  // API
  // app.use('/api', (req, res, next) => {
  //   console.log("A request was made to /api");
  //   next();
  // });
  
  // app.get('/api', (req, res, next) => {
  //   console.log("A get request was made to /api");
  //   res.send({ message: "success" });
  // });

  // server.use("/api", apiRouter);

// Background Color Route
  server.get('/background/:color', (req, res, next) => {
    res.send(`
      <body style="background: ${ req.params.color };">
        <h1>Hello World</h1>
      </body>
    `);
  });

  server.get('/add/:first/to/:second', (req, res, next) => {
    res.send(`<h1>${ req.params.first } + ${ req.params.second } = ${
      Number(req.params.first) + Number(req.params.second)
     }</h1>`);
  });