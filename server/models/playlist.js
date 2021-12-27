const { Schema } = require("mongoose");

const PlaylistSchema = new Schema({
  name: {
    type: String,
    minlength: [1, "Everything must have a name, musn't it?"],
    maxlength: [255, "Well, looks like the limit is 255 this time."],
  },
  queue: [
    {
      type: {
        type: String,
        default: "video",
      },
      videoId: Number,
      url: String,
      title: String,
      description: String,
      image: String,
      thumbnail: String,
      seconds: Number,
      timestamp: String,
      duration: {
        seconds: Number,
        timestamp: String,
      },
      ago: String,
      views: Number,
      author: {
        name: String,
        url: String,
      },
    },
  ],
  active: { type: Boolean, default: true },
  public: { type: Boolean, default: false },
  image: String,
});

module.exports = PlaylistSchema;
