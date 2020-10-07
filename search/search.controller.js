const express = require("express")
const router = express.Router()
const searchService = require("./search.service")

// routes
router.get("/", searchYoutube)

module.exports = router

function searchYoutube(req, res, next) {
  const searchTerm = req.query.q

  if (!searchTerm) {
    res.status(400).json({
      message:
        'no search term provided. use query parameter "q" to include a search term',
    })
  }

  searchService
    .searchYoutube({
      searchTerm: searchTerm,
    })
    .then((results) =>
      results
        ? res.json(results.videos)
        : res.status(400).json({ message: "couldn't get search results" })
    )
    .catch((err) => next(err))
}
