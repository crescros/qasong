const yts = require("yt-search");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  searchYoutube,
  searchYoutubeById,
  searchYoutubePlaylist,
};

async function searchYoutube({ searchTerm }) {
  return yts(searchTerm + " music").then((results) => {
    return results;
  });
}

async function searchYoutubeById({ ids }) {
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  const videos = ids.map((id) => {
    return yts({ videoId: id });
  });

  return Promise.all(videos).then((values) => {
    const queueValues = values.map((value) => {
      return {
        ...value,
        qid: uuidv4(),
      };
    });

    return queueValues;
  });
}

async function searchYoutubePlaylist({ ids }) {
  const list = await yts({ listId: ids });
  return list;
}
