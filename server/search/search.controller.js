const express = require("express");
const router = express.Router();
const searchService = require("./search.service");
const youtubeStream = require('youtube-audio-stream');

// routes
router.get("/", searchYoutube);
router.get("/ids", searchYoutubeById);
router.get("/stream", getStreamFromYoutubeId);

module.exports = router;

function searchYoutube(req, res, next) {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({
      message:
        'no search term provided. use query parameter "q" to include a search term',
    });
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
    .catch((err) => next(err));
}

function searchYoutubeById(req, res, next) {
  const ids = req.query.queue;

  if (!ids) {
    return res.status(400).json({
      message:
        'no search term provided. use query parameter "q" to include a search term',
    });
  }
  searchService
    .searchYoutubeById({
      ids: ids,
    })
    .then((results) => {
      results
        ? res.json(results)
        : res.status(400).json({ message: "couldn't get search results" });
    })
    .catch((err) => next(err));
}
function getStreamFromYoutubeId(req, res, next) {
  const id = req.query.id;

  console.log(id)
  if (!id) {
    return res.status(400).json({
      message:
        'no search term provided. use query parameter "q" to include a search term',
    });
  }

  var requestUrl = 'http://youtube.com/watch?v=' + id
  try {
    youtubeStream(requestUrl).pipe(res)
  } catch (exception) {
    res.status(500).send(exception)
  }

}
