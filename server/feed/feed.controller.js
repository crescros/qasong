const express = require("express");
const router = express.Router();
const mockFeed = require("../data/mockFeed.json");
const shuffle = require("../_helpers/functions");

// routes
router.get("/", getFeed);

module.exports = router;

function getFeed(req, res) {
  res.json(shuffle(mockFeed));
}
