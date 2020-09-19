const express = require('express');
const router = express.Router();
const searchService = require('./search.service');

// routes
router.get('/', search);

module.exports = router;

function search(req, res, next) {

    const searchTerm = req.query.q
    const apiKey = process.env.YOUTUBE_API_KEY

    if (!searchTerm){
        res.status(400).json({message: 'no search term provided. use query parameter "q" to include a search term'})
    }

    if (!apiKey){
        res.status(400).json({message: 'no api key provided'})
    }

    searchService.search({
        searchTerm: searchTerm,
        apiKey: apiKey
    })
        .then(results => results ? res.json(results) : res.status(400).json({ message: "couldn't get search results" }))
        .catch(err => next(err));
}

