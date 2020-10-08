const express = require("express");
const router = express.Router();
const searchService = require("./search.service");

// routes
router.get("/", searchYoutube);

module.exports = router;

function searchYoutube(req, res, next) {
  const searchObj = {
    query: req.query.q,
    limit: req.query.l
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
          ? res.json(results.items.filter((item) => item.type === "video"))
        : res.status(400).json({ message: "couldn't get search results" })
    )
    .catch((err) => next(err));
}
