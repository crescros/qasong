const express = require("express");
const router = express.Router();
const axios = require("axios");
const geoip = require("geoip-lite");
 
// routes
router.post("/", postMessage);

module.exports = router;

function postMessage(req, res) {
  const geo = geoip.lookup(req.ip);

  const country = geo?.country || ""
  const region = geo?.region || ""
  const city = geo?.city || ""
  // const data = geo.eu + geo.area + '.' + geo.metro 

  const textContent =
    "📦 a user submitted feedback:\n> " +
    req.body.message +
    "\n\n" +
    `The user was ${!req.body.mobile ? "not " : ""}using a mobile device` +
    "\n\n" +
    city + ", " + region +
    "\n" +
    country +
    "\n" +
    new Date().toLocaleString() +
    "\n\n";

  const postBody = {
    content: textContent,
  };

  axios({
    method: "post",
    url: process.env.DISCORD_WEBHOOK_URL,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(postBody),
  })
    .then(() => {
      // console.log(data.body);
    })
    .catch(() => {
      // console.log(err.message);
    });

  res.json({ message: "cool" });
}
