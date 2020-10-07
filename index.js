// import dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
require("dotenv").config();
require("rootpath")();

// database connection
// const con = require('./database/connection.js')
// con.connect()

// initialize express
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jwt());
app.use(errorHandler);

// define routes
// app.use('/api/globalchat', require('./globalchat/globalchat.controller'))
// app.use('/api/users', require('./users/users.controller'))
app.use("/api/search", require("./search/search.controller"));
app.use("/api/env", (req, res) => res.send(process.env.NODE_ENV));

// start server
const port = process.env.PORT || 3016;
app.listen(port, () => {
  console.log("Express server is running at http://localhost:" + port);
});
