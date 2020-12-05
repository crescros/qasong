const express = require("express");
const router = express.Router();
const axios = require("axios");

// routes
router.post("/", postMessage);

module.exports = router;

function postMessage(req, res) {
<<<<<<< HEAD
<<<<<<< HEAD
  
=======
>>>>>>> master
=======
>>>>>>> 8f87ee0e22169eecd0c6e17e8c015917601b58d7
  const postBody = {
    // content: [],
    content: req.body,
    // content: "📦 a user submitted a playlist:\n```" + req.body.content + "```",
<<<<<<< HEAD
<<<<<<< HEAD
  }
=======
  };
>>>>>>> master
=======
  };
>>>>>>> 8f87ee0e22169eecd0c6e17e8c015917601b58d7

  axios({
    method: "post",
    url: process.env.DISCORD_WEBHOOK_URL,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(postBody),
  })
    .then((data) => {
      console.log(data.body);
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.json({ message: "cool" });
}
