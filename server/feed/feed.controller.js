const express = require("express");
const router = express.Router();
const mockFeed = require("../data/mockFeed.json");

// routes
router.get("/", getFeed);

module.exports = router;

function getFeed(req, res, next) {
    res.json(mockFeed)
}
