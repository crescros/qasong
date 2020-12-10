const express = require("express");
const router = express.Router();
const axios = require("axios");

// routes
router.post("/", postMessage);

module.exports = router;

function postMessage(req, res) {
  const postBody = {
    content: "📦 a user submitted a playlist:\n```" + req.body + "```",
  };

  axios({
    method: "post",
    url: process.env.DISCORD_WEBHOOK_URL,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(postBody),
  })
    .then((data) => {
      // console.log(data.body);
    })
    .catch((err) => {
      // console.log(err.message);
    });

  res.json({ message: "cool" });
}
