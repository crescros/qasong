const yts = require("yt-search");

module.exports = {
  searchYoutube,
};

const searchFixture = require("./searchFixture.json"); // Test data

async function searchYoutube({ query, currentPage }) {
  if (process.env.USE_MOCK_SEARCH_DATA === "1") {
    return searchFixture.items;
  }
  currentPage = Number(currentPage);
  const options = {
    query,
    currentPage,
    pageStart: currentPage,
    pageEnd: currentPage + 1,
  }

  return yts(options);
}
