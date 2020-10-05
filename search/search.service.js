const yts = require('yt-search');

module.exports = {
    searchYoutube
};


async function searchYoutube({ searchTerm }) {
    const results = await yts(searchTerm);
    return results;
}
