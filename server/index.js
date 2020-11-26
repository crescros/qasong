// import dependencies
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const errorHandler = require("./_helpers/error-handler");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
require("rootpath")();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});

// initialize express
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorHandler);

const nocache = require('nocache')
app.use(nocache())

// api endpoints
app.use("/api/feed", require("./feed/feed.controller"), apiLimiter);
app.use("/api/search", require("./search/search.controller"), apiLimiter);
app.use("/api/billboard", require("./billboard/billboard.controller"), apiLimiter);
app.use("/api/env", (req, res) => res.send(process.env.NODE_ENV), apiLimiter);

// frontend routes
function serveReactApp(req, res) {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname, "../public", "index.html"));
}
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "../public")));
app.get("*", serveReactApp);

// start server
const port = process.env.PORT || 3016;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Express server is running at http://localhost:" + port);
});
