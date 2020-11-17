const express = require("express");
const router = express.Router();
const { getChart } = require("billboard-top-100");

// routes
router.get("/", getFeed);

module.exports = router;

function getFeed(req, res) {
  getChart((err, chart) => {
    res.json(chart.songs);
  });
}
