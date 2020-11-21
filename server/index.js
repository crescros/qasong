// import dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./_helpers/error-handler");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
require("rootpath")();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});

// database connection
// const con = require('./database/connection.js')

// initialize express
const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(jwt());
app.use(errorHandler);

// api endpoints
app.use("/api/users", require("./users/users.controller"), apiLimiter);
app.use("/api/feed", require("./feed/feed.controller"), apiLimiter);
app.use("/api/search", require("./search/search.controller"), apiLimiter);
app.use("/api/billboard", require("./billboard/billboard.controller"), apiLimiter);
app.use("/api/env", (req, res) => res.send(process.env.NODE_ENV), apiLimiter);

// frontend routes
app.get("/billboard", (req, res) => {
  res.sendFile("public/index.html");
});
app.get("/queue", (req, res) => {
  res.sendFile("public/index.html");
});
app.get("/search", (req, res) => {
  res.sendFile("public/index.html");
});
app.get("/", (req, res) => {
  res.sendFile("public/index.html");
});

// start server
const port = process.env.PORT || 3016;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Express server is running at http://localhost:" + port);
});
