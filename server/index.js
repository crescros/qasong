// import dependencies
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");
const socketIo = require("socket.io");
require("dotenv").config();
require("rootpath")();

// database connection
// const con = require('./database/connection.js')
// con.connect()

// initialize express
const app = express();
app.use(cors());
// app.use(
//   morgan("combined", {
//     stream: winston.stream,
//   })
// );
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jwt());
app.use(errorHandler);

const server = http.createServer(app);
const io = socketIo(server);

let usersConnected = 0;

io.on("connection", (socket) => {
  usersConnected++;
  const interval = setInterval(() => {
    socket.emit("usersConnectedUpdate", usersConnected);
  }, 10000);
  socket.on("disconnect", () => {
    usersConnected--;
    clearInterval(interval);
  });
});

// define routes
app.use("/api/search", require("./search/search.controller"));
app.use("/api/env", (req, res) => res.send(process.env.NODE_ENV));

// start server
const port = process.env.PORT || 3016;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Express server is running at http://localhost:" + port);
});
