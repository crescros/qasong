// import dependencies
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./_helpers/error-handler");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const rootpath = require("rootpath");
const nocache = require("nocache");

// middleware config
const apiLimiterConfig = rateLimit({ windowMs: 900000, max: 200 });
const bodyParserConfig = { extended: false }

// middleware
rootpath();
dotenv.config();
const app = express();
app.use(apiLimiterConfig);
app.use(cors());
app.use(bodyParser.urlencoded(bodyParserConfig));
app.use(bodyParser.json());
app.use(errorHandler);
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
  res.sendFile(path.join(__dirname, "../frontend", "build", "static", "index.html"));
}

app.get("/", serveReactApp);
app.get("/billboard", serveReactApp);
app.get("/queue", serveReactApp);
app.get("/search", serveReactApp);
app.get("/playlists", serveReactApp);

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "../frontend", "build")));

// start server
const port = process.env.PORT || 3016;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Express server is running at http://localhost:" + port);
});
