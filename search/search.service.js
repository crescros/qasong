const yts = require("yt-search");

module.exports = {
  searchYoutube,
};

const searchFixture = require("./searchFixture.json"); // Test data

async function searchYoutube({ searchTerm }) {
  if (process.env.USE_MOCK_SEARCH_DATA === "1") {
    return searchFixture.items;
  } else {
    return yts(searchTerm).then((results) => {
      return results;
    });
  }
}
