const express = require("express");
const router = express.Router();
const shuffle = require("../_helpers/functions");

let mockFeed;
try {
  mockFeed = require("../data/mockFeed.json");
} catch (err) {
  mockFeed = [];
}

// routes
router.get("/", getFeed);

module.exports = router;

let feedItems = shuffle(mockFeed);

feedItems = feedItems.map((playlist) => {
  playlist.queue = playlist.queue?.map((song) => {
    const { description, ...everythingElse } = song;
    description;
    return everythingElse;
  });

  return playlist;
});

const limit = 7;

function getFeed(req, res) {
  let pageNumber = parseInt(req.query.page) || 1;

  let totalPages = Math.ceil(feedItems.length / limit);

  let nextPage = parseInt(pageNumber) + 1;

  if (pageNumber >= totalPages) {
    nextPage = 1;
  }

  res.json({
    pageNumber: pageNumber,
    totalPages: totalPages,
    nextPage: nextPage,
    results: feedItems.slice(limit * (pageNumber - 1), limit * pageNumber),
  });
}
