const express = require("express");
const router = express.Router();
const searchService = require("./search.service");

// routes
router.get("/", searchYoutube);

module.exports = router;

function searchYoutube(req, res, next) {
  const searchObj = {
    query: req.query.q,
    limit: req.query.l,
    // TODO: find better way to send full ref with "page" param included already
    ref: req.query.r ? req.query.r + "&page=" + (req.query.page || 1) : ""
  };
  if (!searchObj.query) {
    res.status(400).json({
      message:
        "no search term provided. use query parameter \"q\" to include a search term",
    });
  }

  searchService
    .searchYoutube(searchObj)
    .then((results) =>
      results
        ? res.json(results)
        : res.status(400).json({ message: "couldn't get search results" })
    )
    .catch((err) => next(err));
}
