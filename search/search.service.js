const ytsr = require("ytsr");

module.exports = {
  searchYoutube,
};

const searchFixture = require("./searchFixture.json"); // Test data

async function searchYoutube({ query, limit, ref }) {
  if (process.env.USE_MOCK_SEARCH_DATA === "1") {
    return searchFixture.items;
  }
  const options = {
    limit,
    nextpageRef: ref
  }

  return ytsr(query, options);
}
