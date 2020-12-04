// import dependencies
const express = require("express");
const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./_helpers/error-handler");
const rateLimit = require("express-rate-limit");

require("dotenv").config();
require("rootpath")();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

// initialize express
const app = express();

app.use(apiLimiter);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorHandler);

const nocache = require("nocache");
app.use(nocache());
app.set("etag", false);

// api endpoints
app.use("/api/feed", require("./feed/feed.controller"));
app.use("/api/search", require("./search/search.controller"));
app.use("/api/billboard", require("./billboard/billboard.controller"));
app.use("/api/discord", require("./discord/discord.controller"));
app.use("/api/env", (req, res) => res.send(process.env.NODE_ENV));

// frontend routes
function serveReactApp(req, res) {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname, "../public", "index.html"));
}
// eslint-disable-next-line no-undef
app.get("/", serveReactApp);
app.get("/billboard", serveReactApp);
app.get("/queue", serveReactApp);
app.get("/search", serveReactApp);
app.get("/playlists", serveReactApp);

app.use(express.static(path.join(__dirname, "../public")));

// start server
const port = process.env.PORT || 3016;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Express server is running at http://localhost:" + port);
});
