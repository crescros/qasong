const express = require("express");
const router = express.Router();
const axios = require("axios");

// routes
router.post("/", postMessage);

module.exports = router;

function postMessage(req, res) {
  axios({
    method: "post",
    url: process.env.DISCORD_WEBHOOK_URL,
    data: {
      content: "user playlist\n```" + JSON.stringify(req.body.content) + "```",
    },
  });

  res.json({ message: "cool" });
}
