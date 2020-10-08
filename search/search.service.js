const yts = require("ytsr");

module.exports = {
  searchYoutube,
};

const searchFixture = require("./searchFixture.json"); // Test data

async function searchYoutube({ query, limit }) {
  if (process.env.USE_MOCK_SEARCH_DATA === "1") {
    return searchFixture.items;
  }
  const options = {
    limit
  }

  return yts(query, options);
}
