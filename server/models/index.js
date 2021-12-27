let mongoose = require("mongoose");

module.exports = {
    User: mongoose.model('User', require("./user.js")),
    Playlist: mongoose.model('Playlist', require("./playlist"))
}