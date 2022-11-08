# JuiceBox

We are going to make a "Simple" Tumblr clone; Nothing less than a Back-End-Only project.
We will be designing a back-end which has both a Database layer as well as (later) a web server with a custom API, and testing it by curling against the endpoints we create.

---

Basics

SQL

- How to connect to PostgreSQL from the command line
- Basic PostgreSQL commands like \c, \d
- The basics of creating/dropping an entire database
- The basics of creating/dropping a table
- Basic data types
- What a primary key is
- What a foreign key is
- How to insert data into a database
- How to retrieve data from a database
- How to update data in a database
- How to join related tables into one mega-table

Node

- How to connect to a database using pg
- How to separate our concerns and organize our code
- How to export/import functionality from one file to another

Express

- Use express
- Provide endpoints with 4 "verbs"
  - GET /posts (see posts)
  - POST /posts (create post)
  - PATCH /posts/:id (update post)
  - DELETE /posts/:id (deactivate post)
- Paramaterized routes
  - GET /tags/:tagName/posts (list of all posts with that tagname)
- Sub-routes
  - /api/tags as a sub-route of /api

JWT

- jwt and jwt-express

HTTP Requests
