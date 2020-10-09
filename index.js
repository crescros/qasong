// import dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const jwt = require("./_helpers/jwt");
const morgan = require("morgan");
const winston = require("./_helpers/winston");
const errorHandler = require("./_helpers/error-handler");
const redis = require("redis");
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});
const redisStore = require("connect-redis")(session);
require("dotenv").config();
require("rootpath")();

// database connection
// const con = require('./database/connection.js')
// con.connect()

// initialize express
const app = express();
app.use(cors());
app.use(morgan("combined", { stream: winston.stream }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jwt());
app.use(errorHandler);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "_userSession",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
    store: new redisStore({
      ttl: 60,
      client: redisClient,
    }),
  })
);

// define routes
// app.use('/api/globalchat', require('./globalchat/globalchat.controller'))
// app.use('/api/users', require('./users/users.controller'))
app.use("/api/search", require("./search/search.controller"));
app.use("/api/env", (req, res) => res.send(process.env.NODE_ENV));

app.get("/api/sessions", (req, res) => {
  redisClient.KEYS("sess*", (err, data) => {
    if (err) return res.send(err);
    res.json({ userCount: data.length });
  });
});

// start server
const port = process.env.PORT || 3016;
app.listen(port, () => {
  console.log("Express server is running at http://localhost:" + port);
});
