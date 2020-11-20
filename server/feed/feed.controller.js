const express = require("express");
const router = express.Router();

let mockFeed
try {
  mockFeed = require("../data/mockFeed.json");
} catch (err) {
  mockFeed = [];
}

const shuffle = require("../_helpers/functions");

// routes
router.get("/", getFeed);

module.exports = router;

function getFeed(req, res) {
  res.json(shuffle(mockFeed));
}
