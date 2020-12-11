const express = require("express");
const router = express.Router();
const searchService = require("../search/search.service");
const { v4: uuidv4 } = require("uuid");

// routes
router.get("/", getPlaylist);

module.exports = router;

function getPlaylist(req = "", res) {
  const input = req.query.q;
  // eslint-disable-next-line max-len
  const regex = /(http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/playlist\?list=|\.be\/)([\w\-_]*)(&(amp;)?‌[\w=]*)?)/g;
  const link = regex.exec(input);

  if (link) {
    const PLAY_LIST_ID = link[0].split("list=")[1].split("&")[0];

    searchService
      .searchYoutubePlaylist({ ids: PLAY_LIST_ID })
      .then((result) => {
        const playlist = result.videos.map((item) => {
          return {
            type: "video",
            videoId: item.videoId,
            url: item.url,
            title: item.title,
            description: item.description,
            image: item.image,
            thumbnail: item.thumbnail,
            seconds: item.seconds,
            timestamp: item.timestamp,
            duration: item.duration,
            ago: item.ago,
            views: item.views,
            author: item.author,
            qid: uuidv4(),
          };
        });
        res.json(playlist);
      })
      .catch(() => {
        res.json(null);
      });
  } else {
    res.json(null);
  }
}
